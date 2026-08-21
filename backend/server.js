import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import urlRoutes from "./routes/urlRoutes.js";
import redirectRoutes from "./routes/redirectRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import { errorHandler } from "./middleware/errorHandler.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/urls",urlRoutes);
app.use("/",redirectRoutes);
app.use("/api/auth", authRoutes);

app.get("/",(req,res) => {
    res.send("URL SHORTENER API is running");
});

app.use(errorHandler);

const PORT = process.env.PORT;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, ()=>{
       console.log(`Server running on port ${PORT}`);
    });
};
startServer();

