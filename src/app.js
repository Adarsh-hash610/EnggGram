const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');
const {validateSignupData} = require('./utils/validations');
const bcrypt = require('bcrypt');
const validator = require('validator');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {userAuth} = require('./middlewares/auth');
const app = express();
const PORT = 3000; 

app.use(express.json());
app.use(cookieParser());

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

app.post('/login', async(req,res)=>{
    try {
        const {emailId, password} = req.body;
        if(!validator.isEmail(emailId))
        {
            throw new Error("entered email is incorrect");
        }
        else{
            const user = await User.findOne({emailId:emailId});
            if(!user){
                throw new Error("Invalid Credentials!!");
            }
            else{
                const isPasswordValid = await user.validatePassword(password);
                if(isPasswordValid){

                    // Create a JWT token...
                    const token = await user.getJWT();

                    // Add the token to cookie and send the response back to the user...
                    res.cookie("token",token,
                        {expires:new Date(Date.now()+ 7*3600000)}
                    );
                    res.send("login successfully");
                }
                else{
                    throw new Error("Invalid Credentials");
                }
            }
        }
        
    } catch (err) {
        res.status(400).send("ERROR: "+err.message);
    }
});

app.get('/profile',userAuth,async(req,res)=>{
    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("ERROR "+err.message);
    }
})

app.post("/sendConnectionRequest",userAuth, async(req,res)=>{
    const user = req.user;
    // sending a connection request...
    console.log("sending a connection request");

    res.send(user.firstName + " sent the connection request");
    
})

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


