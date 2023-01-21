const express = require("express")

const {EventModel} = require("../models/event.model")

const eventRouter = express.Router()
eventRouter.use(express.json())

eventRouter.post("/createEvent",async(req,res)=>{
    const data = req.body
    try{
        const todo =  new TodoModel(data)
        await todo.save()
        res.send("todo created")
    }
    catch(err){
        res.send(err)
    }
})