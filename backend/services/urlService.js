import { nanoid } from "nanoid";
import Url from "../models/url.js";
import { redisClient } from "../config/redis.js";

export const createShortUrl = async (originalUrl, userId) => {
  const MAX_ATTEMPTS = 3;
  for(let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++){

    const shortCode = nanoid(7);
    const urlDoc = new Url({
      originalUrl,
      shortCode,
      user: userId,
    });

    try{
      const savedUrl = await urlDoc.save();
      return savedUrl;
    }catch(error){
      if(error.code === 11000 && error.keyPattern?.shortCode){
        if(attempt === MAX_ATTEMPTS){
          const collisionError = new Error("Unable to generate a unique short code");
          collisionError.statusCode = 500;
          throw collisionError;
        }
        continue;
      }
      throw error;
    }

  }
};

export const redirectUrl = async(shortCode) => {

   let cacheUrl = null;

   if(redisClient.isOpen){
    try{
      cacheUrl = await redisClient.get(`url:${shortCode}`);
    }catch(error){
      console.error("Redis GET failed:", error.message);
    }
   }
   
    if(cacheUrl){
      console.log("Cache HIT");
      return cacheUrl;
    }

    console.log("Cache MISS");

    const urlDoc = await Url.findOne({ shortCode });
    if(!urlDoc){
        return null;
    }
    
    const originalUrl = urlDoc.originalUrl;

    if(redisClient.isOpen){
      try{
        await redisClient.set(`url:${shortCode}`, originalUrl,{
       EX: 60,
        }); 
      }catch(error){
        console.error("Redis SET failed:", error.message);
      }
    }

    console.log(originalUrl);
    return originalUrl;
}

export const showMyUrls = async(userId) => {
  const myUrlsList = await Url.find({user: userId });
  return myUrlsList;
}

export const deleteUrl = async(urlId, userId) => {
  const url = await Url.findById(urlId);
  if(!url){
    const error = new Error("URL not found");
    error.statusCode = 404;
    throw error;
  }

  if(url.user.toString() !== userId.toString()){
    const error = new Error("You are not authorized to delete this URL");
    error.statusCode = 403;
    throw error;
  }

  const deletedUrl = await Url.findByIdAndDelete(urlId);

  if(redisClient.isOpen){
    try{
      await redisClient.del(`url:${deletedUrl.shortCode}`);
    }catch(error){
      console.error("Redis DEL failed:",error.message);
    }
  }

  return deletedUrl;
} 