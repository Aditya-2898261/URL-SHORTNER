import dotenv from "dotenv";
import mongoose from "mongoose";
import { Worker } from "bullmq";
import connectDB from "../config/db.js";
import {processClickAnalytics} from "../services/analyticsService.js";


dotenv.config();
let clickAnalyticsWorker;
let isShuttingDown = false;

const startWorker = async () => {

    await connectDB();

    clickAnalyticsWorker = new Worker(
        "click-analytics",
        async(job) => {
        await processClickAnalytics(job.data);
        },
        {
            connection:{
                host: process.env.REDIS_HOST,
                port: Number(process.env.REDIS_PORT),
                username: process.env.REDIS_USERNAME,
                password: process.env.REDIS_PASSWORD,

                // Worker is long-running.
                // It should keep the Redis connection alive/reconnect.
                maxRetriesPerRequest: null,
            },
        }
    );

    clickAnalyticsWorker.on("error", (error) => {
        console.error("Analytics worker error:", error);
    });

    clickAnalyticsWorker.on("failed", (job, error) => {
        console.error(
            `Analytics job ${job?.id} failed:`,
            error.message
        );
    });

    console.log("Click analytics worker started");
};

const shutdown = async(signal) => {
    if(isShuttingDown){
        return;
    }
    isShuttingDown = true;

    console.log(`${signal} received. Closing analytics worker...`);

    try{
        if(clickAnalyticsWorker){
            await clickAnalyticsWorker.close();
        }
        await mongoose.disconnect();
        console.log("Analytics worker shut downed cleanly.");
        process.exitCode = 0;
    }catch(error){
        console.error("Failed to shut down analytics worker:", error);
        process.exitCode = 1;
    }
};

process.on("SIGINT", () => {
    void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
    void shutdown("SIGTERM");
});

startWorker().catch((error) => {
    console.error("Failed to start click analytics worker:", error);
    process.exit(1);
});



