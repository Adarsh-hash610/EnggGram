const express = require('express');

const app = express();
const PORT = 3000; 
// Request handler...

app.use('/user',
    (req,res,next)=>{
        console.log("Handling the route user1!!");
        // res.send("1st response!!");
        next();
    },
    (req,res,next)=>{
        console.log("Handling the route user 2!!");
        // res.send("2nd response");
        next();
    },
    (req,res,next)=>{
        console.log("Handling the route user 3!!");
        // res.send("3rd response");
        next();
    },
    (req,res,next)=>{
        console.log("Handling the route user 4!!");
        // res.send("4th response");
        next();
    },
    (req,res,next)=>{
        console.log("Handling the route user 5!!");
        res.send("5th response");
    }

);


app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
});
