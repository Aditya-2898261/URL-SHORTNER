require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db.js");




app.get("/",(req,res) => {
    res.send("URL SHORTENER API is running");
});

const PORT = process.env.PORT;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, ()=>{
       console.log(`Server running on port ${PORT}`);
    });
};
startServer();

