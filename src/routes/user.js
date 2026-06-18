const express = require('express');
const userRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const { connection } = require('mongoose');
const User = require('../models/user');

// get all the pending request for the loggedIn user...
userRouter.get('/user/requests/received', userAuth, async(req,res)=>{
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId",["firstName","lastName","age","gender"]);

        const data = connectionRequest.map((row)=>row.fromUserId);
        res.json({
            message:"Data fetched successfully",
            data
        });
        
    } catch (err) {
        res.status(400).send("ERROR: "+err.message);
        
    }
});

userRouter.get('/user/connections', userAuth, async(req,res)=>{
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {toUserId: loggedInUser, status:"accepted"},
                {fromUserId: loggedInUser, status:"accepted"},
            ],
        }).populate("fromUserId",["firstName","lastName"])
        .populate("toUserId",["firstName","lastName"]);

        const data = connectionRequest.map((row)=>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString())
            {
                return row.toUserId;
            }
            else{
                return row.fromUserId;
            }
        });

        res.json({data});
    } catch (err) {
        res.status(400).send("ERROR: "+err.message);
    }
});

userRouter.get('/user/feed', userAuth, async(req,res)=>{
    try {
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50?50:limit;
        const skip = (page-1)*limit;

        const connectionRequest = await ConnectionRequest.find({
            $or:[
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id}
            ],
        }).select("fromUserId toUserId");

        const hideUserFromFeed = new Set();
        connectionRequest.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({
            $and:[
                {_id: {$nin: Array.from(hideUserFromFeed)}},
                {_id: {$ne: loggedInUser._id}}
            ],
        })
        .select("firstName lastName, about, skills")
        .skip(skip)
        .limit(limit);

        res.send(users);
        
    } catch (err) {
        res.status(400).send("ERROR: "+err.message); 
    }
})
module.exports = userRouter;