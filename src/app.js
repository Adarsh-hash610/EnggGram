const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const {validateSignupData} = require('./utils/validations');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000; 

app.use(express.json());

app.post('/signup',async(req,res)=>{
    
    // console.log(req.body);
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

app.get('/user', async(req,res)=>{
    const userEmail = req.body.emailId;

    try{
        const users = await User.find({emailId:userEmail});
        if(users.length === 0)
        {
            res.status(404).send("User not found");
        }
        else{
            res.send(users);
        }
    }
    catch(err)
    {
        res.status(400).send("Something went wrong!!");
    }
});

// Feed API - GET/feed - get all the user from the database
app.get('/feed',async (req,res)=>{
    try {
        const users = await User.find({});
        if(users.length === 0)
        {
            res.status(404).send("User not found");
        }
        else{
            res.send(users);
        }
        
    } catch (err) {
        res.status(400).send("something went wrong");
        
    }
});

app.delete('/user', async (req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User delete successfully");
    }
    catch(err){
        res.status(400).send("something went wrong!!");

    }
});

app.patch('/user/:userId', async (req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = [
            // userId,
            "photoUrl",
            "about",
            "gender",
            "age",
            "skills",
        ];
        const isUpdateAllowed = Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k));

        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        if(data?.skills.length >10){
            throw new Error("Skill Limit exceeded!!");
        }
        const user = await User.findByIdAndUpdate({_id:userId},data,{
            returnDocument:"after",
            runValidators:true,
        });
        console.log(user);
        res.send("User updated successfully");
    } catch (err) {
        res.status(400).send("something went wrong!!"+err.message);        
    }
});


connectDB()
.then(()=>{
    console.log("Database connected successfully");
    app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
});
})
.catch(err =>{
    console.log("Database connection failed!!");
})


