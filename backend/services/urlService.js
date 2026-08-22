import { nanoid } from "nanoid";
import Url from "../models/url.js";

export const createShortUrl = async (originalUrl, userId) => {
  const shortCode = nanoid();
  const urlDoc = new Url({
    originalUrl,
    shortCode,
    user: userId,
  });

  const savedUrl = await urlDoc.save();
  return savedUrl;
};

export const redirectUrl = async(shortCode) => {
    const urlDoc = await Url.findOne({ shortCode });
    if(!urlDoc){
        return null;
    }
    const originalUrl = urlDoc.originalUrl;
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
  return deletedUrl;
} 