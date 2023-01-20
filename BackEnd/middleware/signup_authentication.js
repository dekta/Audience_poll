const jwt =  require("jsonwebtoken");
require('dotenv').config()



const signupAuthenticate = (req,res,next)=>{
    const token = req.headers?.authorization?.split(' ')[1] || req.cookies?.signup_token
    if(token){
        const decoded = jwt.verify(token, process.env.SIGNUP_KEY);
        if(decoded){
            const userID = decoded.id;
            req.body.userID = userID
            req.body.firstName = decoded.firstName
            next()
        }
        else{
            res.send("please login")
        }
    }
    else{
        res.send("please login")
    }
}

module.exports = {signupAuthenticate}