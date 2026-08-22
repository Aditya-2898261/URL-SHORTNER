import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    originalUrl:{
        type:String,
        required:true
    },
    shortCode:{
        type:String,
        required:true,
        unique:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    }
});

export default mongoose.model('Url',urlSchema);
