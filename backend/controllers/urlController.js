import clickAnalyticsQueue from "../queues/clickAnalyticsQueue.js";
import {
    createShortUrl as createShortUrlService,
    redirectUrl as redirectUrlService,
    showMyUrls as showMyUrlsService,
    deleteUrl as deleteUrlService
} from "../services/urlService.js";
import crypto from "crypto";


export const createShortUrl = async (req,res) => {
    const { originalUrl } = req.body;
    
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

    const clickEvent = {
    eventId: crypto.randomUUID(),
    shortCode: req.params.shortCode,
    timestamp: new Date(),
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    referrer: req.get("referer"),
    query: req.query
    };

    try{
        const job = await clickAnalyticsQueue.add("click",clickEvent);
         console.log("Click analytics job added");
         console.log("Job ID:", job.id);
    }catch(error){
        console.error(
            "Failed to queue click analytics:",
            error.message
        );
    }

    res.redirect(originalUrl);
};

export const showMyUrls = async(req,res) => {
    const myUrls = await showMyUrlsService(req.user);
    if(myUrls.length === 0){
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


