import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username : {
        type :String,
        required : [true, "Please provide a username"],
       
    },

    email : {
        type :String,
        required : [true, "Please provide a email"],
        unique : true,
    },
    linkedinprofile: 
    {
     type: String,
     required: [true, "Please provide a LinkedIn profile"], 
     unique: true },

    password : {
        type :String,
        required : [true, "Please provide a password"],

    },
    forgetPasswordToken : String,
    forgetPasswordTokenExpiry : Date,
    verifyToken :String,
    verifyTokenExpiry : Date,


})
const User = mongoose.models.users || mongoose.model("users",userSchema);

export default User;