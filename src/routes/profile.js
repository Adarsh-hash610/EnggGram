const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const {validateUpdateProfileData} = require('../utils/validations');
const User = require('../models/user');
const bcrypt = require('bcrypt');

profileRouter.get('/profile/view',userAuth,async(req,res)=>{
    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR "+err.message);
    }
});

profileRouter.patch('/profile/update',userAuth,async(req,res)=>{
    try{
        if(!validateUpdateProfileData(req))
        {
            throw new Error("Update not allowed!!");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key)=>loggedInUser[key]=req.body[key]);
        await loggedInUser.save();
        res.send(`${loggedInUser.firstName}, your profile updated successfully!!`)
    }
    catch(err){
        res.status(400).send("ERROR UPDATING: "+ err.message);
    }
});

profileRouter.patch('/profile/password',userAuth, async (req,res)=>{
    try{
        const user = req.user;
        const {currentPassword,  newPassword} = req.body;
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if(!isPasswordValid){
            throw new Error("Current Password is not valid");
        }
        if(currentPassword === newPassword)
        {
            throw new Error("Use another Password!!");
        }
        const hashnewPassword = await bcrypt.hash(newPassword,10);
        user.password = hashnewPassword;
        await user.save();
        res.send("Password changed successfully")

    }
    catch(err){
        res.status(400).send("ERROR UPDATING PASSWORD "+ err.message);
    }

});

module.exports = profileRouter;