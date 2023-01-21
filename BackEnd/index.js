const express = require("express")
require("dotenv").config()
const bcrypt =  require('bcrypt')
const jwt =  require("jsonwebtoken")
const cors = require('cors')
const validator = require("email-validator");
const nodemailer = require('nodemailer');
const cookieParser = require('cookie-parser')


const {UserModel} = require('./models/user.model')
const {connect} = require("./config/db")
const {signupAuthenticate} = require("./middleware/signup_authentication")
const {personalRouter} = require('./routes/personal.route')

const app =  express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.get("/",(req,res)=>{
    res.send("ok")
})


app.post('/audiencePoll/signup',async(req,res)=>{
    const {firstName,lastName,email,password,role} = req.body;
    const exists  = await UserModel.findOne({email})
   // console.log(exists)
    try{
        bcrypt.hash(password,5, async function(err,hash){
            if(err){
                res.send("wrong")
            }
            if(exists){
                res.status(400).send({"msg":"user already exists"})
            }
            else{
                if(validator.validate(email)){
                    const user = new UserModel({firstName,lastName,email,password:hash})
                    await user.save() 
                    emailMessage(email) 
                    const userId = await UserModel.findOne({email})
                    const signup_token = jwt.sign({firstName,email,id:userId._id}, process.env.SIGNUP_KEY);
                    //console.log(signup_token)
                    req.headers = signup_token
                    res.cookie("signup_token",signup_token,{httpOnly:true})
                    res.status(201).send({"msg":"congrats! signup successfull"})
            
                    
                }
                else{
                    res.status(400).send({"msg":"invalid email"})
                }

            }
    
        })
    }
    catch(err){
        res.send({"Error":err})
    }
    
})

async function emailMessage(email){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
        }
        });

        const mailConfigurations = {
            from: 'ektadhawalwork04@gmail.com',
            to:email,
            subject: `Getting Started with Audience Poll`,
            text: "Welcome to Audience Poll for Education! We can't wait to help you make your classes more engaging with live polls,quizzes and interactive Q&A",
            
        };

        transporter.sendMail(mailConfigurations, async function (error, info) {
            if (error){
                console.log(error)
            }
            console.log('Email Sent Successfully');
            //console.log(info);
        })
}

app.post('/audiencePoll/login',async(req,res)=>{
    const {email,password} = req.body;
    const user =  await UserModel.findOne({email})
    const hash_password = user?.password
    try{
        if(user.email){
            bcrypt.compare(password, hash_password, function(err, result) {
                if(result){
                    const token = jwt.sign({ email,id:user._id}, process.env.LOGIN_KEY);
                    //const ref_token = jwt.sign({userID:user._id }, process.env.SRKEY,{ expiresIn: 300000 })
                    res.cookie("login_token",token,{httpOnly:true})
                    res.status(200).send({"msg":"login successfully","normaltoken":token})
                }
                else{
                    res.status(401).send("invalid email and password")
                }
            });
        }
        else{
            res.status(401).send("user not exist")
        }
    }
    catch(err){
        res.send(err)
    }
    
})

app.get("/logout",(req,res)=>{
    const token = req.headers?.authorization?.split(' ')[1]|| req.cookies?.token
    const blacklisting = JSON.parse(fs.readFileSync("./blacklist.json","utf-8"))
    blacklisting.push(token)
    fs.writeFileSync("./blacklist.json",JSON.stringify(blacklisting))
    return res.send("user logout")

})

app.use("/userOnbording",signupAuthenticate,personalRouter)

app.listen(8050,async(req,res)=>{
    try{
        await connect
        console.log("connected to db")
    }
    catch(err){
        console.log(err)
    }
    console.log("server")
})