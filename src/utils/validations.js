const validator = require('validator');

const validateSignupData = (req) =>{
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }
    else if(firstName.length < 4 || firstName>50){
        throw new Error("firstName should be 4 to 50 characters");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong");
    }
};

const validateUpdateProfileData = (req) =>{
    const allowedUpdateFields = ["firstName","lastName","skills","about","gender","age"];
    const isUpdateAllowed = Object.keys(req.body).every((field)=>
        allowedUpdateFields.includes(field)
    );
    return isUpdateAllowed;
}



module.exports = {
    validateSignupData,
    validateUpdateProfileData
};