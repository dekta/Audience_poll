const express = require("express");

const {EventModel} = require("../models/event.model");
const {AnsModel} =  require("../models/ans.model")

const EventRouter = express.Router();

EventRouter.use(express.json())


EventRouter.get("/allques",async (req,res)=>{
    let data = await EventModel.find()
    res.send(data)
})

EventRouter.post("/getAns",async(req,res)=>{
    let {code} = req.body
    let data =  await AnsModel.find({eventCode:code})
    if(data){
        res.send(data)
    }
    else{
        res.send("code not valid")
    }
    
})



module.exports = {EventRouter}