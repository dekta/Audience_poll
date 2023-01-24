const express = require("express");

const {EventModel} = require("../models/event.model");

const EventRouter = express.Router();

EventRouter.use(express.json())


EventRouter.get("/allques",async (req,res)=>{
    let data = await EventModel.find()
    res.send(data)
})

EventRouter.post("/getAns",(req,res)=>{
    let code = req.code
    let data =  AnsModel.find({})
    if(data.eventCode==code){
        res.send(data)
    }
    
})



module.exports = {EventRouter}