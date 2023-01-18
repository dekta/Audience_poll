const express = require("express")
require("dotenv").config()
const bcrypt =  require('bcrypt')
const jwt =  require("jsonwebtoken")


const {UserModel} = require('./models/user.model')

const app =  express()
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("ok")
})

app.post('/signup',(req,res)=>{
    const {name,email,password} = req.body;
    try{
        bcrypt.hash(password,5, async function(err,hash){
            if(err){
                res.send("wrong")
            }
            const user = new UserModel({name,email,password:hash})
            await user.save()
            res.status(201).send({"msg":"signupsuccessful"})
        })
    }
    catch(err){
        res.send(err)
    }
    
})

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