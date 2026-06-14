const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const app = express();
const PORT = 3000; 

app.use(express.json());

app.post('/signup',async(req,res)=>{

    // console.log(req.body);
    // creating a new instance of the User model
    const user = new User(req.body);
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
    console.log("Database connection failed!!");
})


