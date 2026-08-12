require("dotenv").config();
const express = require("express");

const app = express();

app.get("/",(req,res) => {
    res.send("URL SHORTENER API is running");
});

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});