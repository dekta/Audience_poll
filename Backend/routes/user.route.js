const express = require("express");
require("dotenv").config()
const bcrypt =  require('bcrypt')
const jwt =  require("jsonwebtoken")
const cors = require('cors')
const validator = require("email-validator");
const nodemailer = require('nodemailer');
const cookieParser = require('cookie-parser')


const {UserModel} = require('../models/user.model')

const user = express.Router();
user.use(cookieParser())
user.use(express.json())
user.use(cors())


user.post('/signup',async(req,res)=>{
    const {firstName,lastName,email,password,role} = req.body;
    const exists  = await UserModel.findOne({email})
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
                    // emailMessage(email) 
                    const userId = await UserModel.findOne({email})
                    res.status(201).send({"msg":"congrats! signup successfully"})
            
                    
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


// async function emailMessage(email){
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//         type: 'OAuth2',
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD,
//         clientId: process.env.CLIENT_ID,
//         clientSecret: process.env.CLIENT_SECRET,
//         refreshToken: process.env.REFRESH_TOKEN
//         }
//         });

//         const mailConfigurations = {
//             from: 'ektadhawalwork04@gmail.com',
//             to:email,
//             subject: `Getting Started with Audience Poll`,
//             text: "Welcome to Audience Poll for Education! We can't wait to help you make your classes more engaging with live polls,quizzes and interactive Q&A",
            
//         };

//         transporter.sendMail(mailConfigurations, async function (error, info) {
//             if (error){
//                 console.log(error)
//             }
//             console.log('Email Sent Successfully');
//             //console.log(info);
//         })
// }


user.post('/login',async(req,res)=>{
    const {userName,email,password} = req.body;
    const user =  await UserModel.findOne({email})
   
    const hash_password = user?.password
    try{
        if(user.email){
            bcrypt.compare(password, hash_password, function(err, result) {
                if(result){
                    const token = jwt.sign({email,id:user._id,userName}, "LoginKey");
                    res.cookie("token",token,{httpOnly:true})
                    res.status(200).send({"msg":"login successfully","token":token,"userName":userName,"email":email})
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



module.exports = {user}