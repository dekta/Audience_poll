const express = require("express");
const jwt = require("jsonwebtoken")
const {EventModel} = require("../models/event.model");

const EventRouter = express.Router();

EventRouter.use(express.json())


EventRouter.post("/allques",async (req,res)=>{
    let {token} =  req.body
   // console.log("all",token)
    if (!token) {
        res.status(401).send({ error: 'Authorization token not provided , please login' });
        return;
    }
    jwt.verify(token,"LoginKey",async (err, decoded) => {
        if (err) {
          res.status(401).send({ error: 'Invalid token' });
          return;
        }
        const userEmail = decoded.email;
        //console.log(userEmail)
        let data = await EventModel.find({userEmail})
        console.log(data)
        res.status(200).send(data)
    })
    
    
    
})

EventRouter.post("/ques",async(req,res)=>{
    const {eventId,eventName,question,time,userEmail} = req.body
    try{
        let event = new EventModel( {eventId,eventName,question,time,userEmail})
        await event.save()
        res.send({"msg":"event created"})
    }
    catch(err){
        res.send(err)
    }
})






module.exports = {EventRouter}