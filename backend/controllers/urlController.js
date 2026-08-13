import {
    createShortUrl as createShortUrlService,
    redirectUrl as redirectUrlService
} from "../services/urlService.js";


export const createShortUrl = async (req,res) => {
    const { originalUrl } = req.body;
    const result = await createShortUrlService(originalUrl);
    res.json(result);
};

export const redirectUrl = async(req,res) => {
    const {shortCode} = req.params;
    const originalUrl = await redirectUrlService(shortCode);
    if(!originalUrl){
        return res.status(404).json({
            message: "Short URL not found"
        });
    }
    res.redirect(originalUrl);
};


