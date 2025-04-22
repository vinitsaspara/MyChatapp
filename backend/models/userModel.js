import mongoose from "mongoose";


const userModel = new mongoose.Schema({
    userName : {
        type: String,
        required: true,
        unique : true
    },
    fullName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePhoto:{
        type:String,
        default : ""
    },
    gender:{
        type:String,
        enum : ["male","female"],
        required : true
    }
},{ timestamps: true});

export const User = mongoose.model("User",userModel);