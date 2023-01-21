const jwt = require('jsonwebtoken');

require('dotenv').config()

const authenticate = (req,res,next)=>{
    const token = req.headers?.authorization?.split(' ')[1]|| req.cookies?.login_token
    if(token){
        jwt.verify(token, process.env.LOGIN_KEY, function(err, decoded) {
            if(err){
                res.status(401).send("login again")
            }
            else{
                next()
            }
        });
    }
    else{
        res.status(401).send("login again")
    }
}


module.exports = {authenticate}