const express = require('express');
const {adminAuth, userAuth} = require("./middlewares/auth.js");

const app = express();
const PORT = 3000; 

// Handle Auth Middleware for all GET, POST, ... requests

app.use("/admin", adminAuth);

app.use("/user", userAuth,(req,res) =>{
    res.send("user data sent");
} )

app.get("/admin/getAllData",(req,res,next)=>{
    console.log("Data sent successfully");
    res.send("All data sent!!");
});

app.get("/admin/deleteUser",(req,res,next)=>{
    res.send("Deleted a user");
})

app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
});
