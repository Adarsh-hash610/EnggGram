const express = require('express');
const authRouter = express.Router();
const validator = require('validator');
const {validateSignupData} = require('../utils/validations');
const User = require('../models/user');
const bcrypt = require('bcrypt');


authRouter.post('/signup',async(req,res)=>{
    try{
        // validation of the data...
        validateSignupData(req);
        
        const {firstName, lastName, emailId, password} = req.body;
        // encrypt the password...
        const passwordHash = await bcrypt.hash(password,20);
        console.log(passwordHash);

        // creating a new instance of the User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
        });
        await user.save();
        res.send("User Added successfully!!");
    }
    catch(err){
        res.status(400).send("Error saving the user: "+ err.message);
    }
});

authRouter.post('/login', async(req,res)=>{
    try {
        const {emailId, password} = req.body;
        if(!validator.isEmail(emailId))
        {
            throw new Error("entered email is incorrect");
        }
        else{
            const user = await User.findOne({emailId:emailId});
            if(!user){
                throw new Error("Invalid Credentials!!");
            }
            else{
                const isPasswordValid = await user.validatePassword(password);
                if(isPasswordValid){

                    // Create a JWT token...
                    const token = await user.getJWT();

                    // Add the token to cookie and send the response back to the user...
                    res.cookie("token",token,
                        {expires:new Date(Date.now()+ 7*3600000)}
                    );
                    res.send("login successfully");
                }
                else{
                    throw new Error("Invalid Credentials");
                }
            }
        }
        
    } catch (err) {
        res.status(400).send("ERROR: "+err.message);
    }
});

module.exports = authRouter;
