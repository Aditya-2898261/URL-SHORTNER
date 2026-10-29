import mongoose from "mongoose";
import ClickAnalytics from "../models/ClickAnalytics.js";
import Url from "../models/url.js";

import { enrichClickEvent } from "./analyticsEnricher.js";
import { transformAnalytics } from "./analyticsTransformer.js";

const processClickAnalytics = async(clickEvent) => {
    console.log("Processing click analytics");
    
    const enrichedData = await enrichClickEvent(clickEvent);
    const analyticsDocument = transformAnalytics(enrichedData);

   const session = await mongoose.startSession();

   try{
        await session.withTransaction(async() => {
            await ClickAnalytics.create(
                [analyticsDocument],
                {session}
            );
            const result = await Url.updateOne(
                {shortCode: analyticsDocument.shortCode},
                {$inc:{clicksCount:1}},
                {session}
            );
            if(result.matchedCount !== 1){
                throw new Error(
                    `Url not found for the shortCode:${analyticsDocument.shortCode}`
                );
            }

        });
        console.log("Click analytics saved:",analyticsDocument._id);
    }catch(error){
        const duplicateEvent = 
            error.code === 11000 && 
            error.keyPattern?._id === 1 && 
            error.keyValue?._id === analyticsDocument._id;

        if(duplicateEvent){
            console.log("Click event already processed:", analyticsDocument._id);
            return;
        }
        throw error;
    }finally{
        await session.endSession();
    }
};

export {processClickAnalytics};