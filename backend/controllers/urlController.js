import {
    createShortUrl as createShortUrlService,
    redirectUrl as redirectUrlService,
    showMyUrls as showMyUrlsService,
    deleteUrl as deleteUrlService
} from "../services/urlService.js";


export const createShortUrl = async (req,res) => {
    const { originalUrl } = req.body;
    if(!originalUrl){
        return res.status(400).json({
            message:"originalUrl is required"
        });
    }
    try{
        new URL(originalUrl);
    }catch{
        return res.status(400).json({
            message: "Invalid URL"
        });
    }
    const result = await createShortUrlService(originalUrl, req.user);
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

export const showMyUrls = async(req,res) => {
    const myUrls = await showMyUrlsService(req.user);
    if(myUrls.length == 0){
      return res.json({
        message:"create one to have your urls"
      })
    }
    res.json({
        success: true,
        count: myUrls.length,
        data:myUrls
    });
}

export const deleteUrl = async(req,res) => { 
    const {urlId} = req.params;

    const deletedUrl = await deleteUrlService(urlId, req.user);
    res.status(200).json({
        message:"URL deleted successfully",
        deletedUrl,
    });
};


