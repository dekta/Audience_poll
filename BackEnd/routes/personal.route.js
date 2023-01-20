const express = require("express");

const {PersonalModel} = require("../models/personal.model");

const personalRouter = express.Router();

personalRouter.use(express.json())

personalRouter.get("/",async(req,res)=>{
    const list =  await PersonalModel.find();
    res.send(list)
})

personalRouter.post('/personlized',async(req,res)=>{
    const data =  req.body;
    try{
        const new_data = new PersonalModel(data)
        await new_data.save()
        //console.log(new_data)
        res.send("personlized data saved")
    }
    catch(err){
        res.send(err)
    }
})

personalRouter.patch("/update/:personalId", async(req,res)=>{
    const personalId  = req.params.personalId;
    const userID = req.body.userID;
    const data = req.body
    try{
        const app = await PersonalModel.findOne({userID:personalId})
        if(personalId !== app.userID){
            console.log("hi")
            res.send("not valid id")
        }
        else{
           await PersonalModel.findByIdAndUpdate({_id:app._id},data);
           res.send("personal updated")
        }
    }
    catch(err){
        res.send(err)
    }
        
})

personalRouter.delete("/delete/:personalId", async(req,res)=>{
    const personalId  = req.params.personalId;
    try{
        const app = await PersonalModel.findOne({userId:personalId})
        console.log(app)
        if(personalId !== app.userID){
            res.send("not valid id")
        }
        else{
           
           await PersonalModel.findByIdAndDelete({_id:app._id});
           res.send("personal deleted")
        }
    }
    catch(err){
        res.send(err)
    }
        
})

module.exports = {personalRouter}