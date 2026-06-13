const express = require('express');

const app = express();
const PORT = 3000; 
// Request handler...
// this will only handle GET call to /user
app.get("/user",(req,res)=>{
    res.send({firstName: "Adarsh",
        lastName:"Pandey"
    });
});

app.post("/user",(req,res)=>{
    // saving data to DB
    res.send("data successfully saved to the database");
});

app.delete("/user",(req,res)=>{
    res.send("Deleted Successfully");
});

// this will match all the HTTP method API call to /hello
app.use("/hello",(req,res)=>{
    res.send("Hello from the server");
});

app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
});
