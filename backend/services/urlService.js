import { nanoid } from "nanoid";
import Url from "../models/url.js";

export const createShortUrl = async (originalUrl) => {
  const shortCode = nanoid();
  const urlDoc = new Url({
    originalUrl,
    shortCode,
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