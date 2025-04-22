import mongoose from "mongoose";


const massageModel = new mongoose.Schema({

    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        requried: true
    },
    receiverId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    message : {
        type : String,
        required: true
    }

},{timestamps: true});

export const Message = mongoose.model("Message",massageModel);