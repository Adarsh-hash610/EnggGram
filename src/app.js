const express = require('express');

const app = express();
const PORT = 3000; 
// Request handler...
// this will only handle GET call to /user

// app.get("/user",(req,res)=>{
//     console.log(req.query);
//     res.send({firstName: "Adarsh",
//         lastName:"Pandey"
//     });
// });

app.get("/user/:userId/:name/:password",(req,res)=>{
    console.log(req.params);
    res.send({firstName: "Adarsh",
        lastName:"Pandey"
    });
});


app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
});
