import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    profilePhoto: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        require: true
    },
    auth_token : {
        type:String
    }
},{timestamps:true});

export const User = mongoose.model('User', userModel)