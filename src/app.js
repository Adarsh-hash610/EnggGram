const express = require('express');
const {adminAuth, userAuth} = require("./middlewares/auth.js");

const app = express();
const PORT = 3000; 


app.get("/getUserData",(req,res)=>{
    try{
        // logic of DB call and get user data...
        throw new Error("abcdjdf");
        res.send("User data sent");
    }
    catch(err){
        res.status(500).send("Some error occured!!");
    }
});

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong!!");
    }
});

app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
});
