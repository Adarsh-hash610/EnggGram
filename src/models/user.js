const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET, {expiresIn:"1d"});
    return token;
};

userSchema.methods.validatePassword = async function (inputPassByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(inputPassByUser,passwordHash);
    return isPasswordValid;
}

const User = mongoose.model("User", userSchema);
module.exports = User;