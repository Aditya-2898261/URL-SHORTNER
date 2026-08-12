require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

main()
.then(() => {
    console.log("MongoDB connected");
})
.catch((err) => {
    console.error("MongoDB connection failde:", error);
});

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
}

app.get("/",(req,res) => {
    res.send("URL SHORTENER API is running");
});

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});