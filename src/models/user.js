const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        maxLength: 50
    },
    lastName:{
        type: String
    },
    emailId:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email address: "+value);
            }
        },
    },
    password:{
        type:String,
        required: true,
        minLength: 8,
        trim: true,
        validate(value){
            if(!validator.isStrongPassword(value))
            {
                throw new Error("Entered Password is weak: "+value);    
            }
        }
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid!!")
            }
        }
    },
    photoUrl:{
        type: String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo URL: "+value);
            }
        }
    },
    about:{
        type: String,
        default:"This is the default of the user."
    },
    skills:{
        type:[String]
    }
},
{
    timestamps:true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;