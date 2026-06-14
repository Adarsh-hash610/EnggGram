const adminAuth = (req,res,next)=>{
    console.log("User authentication is getting checked!!")
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized Access!!");
    }
    else{
        next();
    }
};

const userAuth = (req,res,next)=>{
    console.log("User Auth is being checked!!");
    const token = "xyaadfz";
    const isUserAuthorized = token ==="xyz";
    if(!isUserAuthorized){
        res.status(401).send("user is unauthorized!!");
    }
    else{
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth
};