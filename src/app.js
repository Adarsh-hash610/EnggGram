const express = require('express');

const app = express();
const PORT = 3000;
  
// Request handler...
app.use('/hello',(req,res)=>{
    res.end("Hello from the server");
})

app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
});
