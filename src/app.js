const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();
const PORT = 3000; 

app.post('/signup',async(req,res)=>{
    // creating a new instance of the User model
    const user = new User({
        firstName:"Sachin",
        lastName:"Tendulkar",
        emailId:"sachin@tendulkar.com",
        age: 48,
        password:"sachin@1234566",
    })
    try{
        await user.save();
        res.send("User Added successfully!!");
    }
    catch(err){
        res.status(400).send("Error saving the user: "+ err.message);
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
    console.log("Database connection faileddd!!!");
})


