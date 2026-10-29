import dotenv from "dotenv";
import {Queue} from "bullmq";

dotenv.config();

const clickAnalyticsQueue = new Queue("click-analytics",{
   connection:{
       host: process.env.REDIS_HOST,
        port:Number(process.env.REDIS_PORT),
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,

        // Producer/HTTP request:
        // fail reasonably quickly if Redis is unavailable.
        maxRetriesPerRequest: 1,
        
   },
   skipWaitingForReady: true, 

   defaultJobOptions:{
      attempts: 3,
      backoff: {
         type: "exponential",
         delay: 1000,
      },
   },

});

export default clickAnalyticsQueue;