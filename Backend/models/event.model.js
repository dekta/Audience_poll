let mongoose =  require("mongoose")

let eventSchema = mongoose.Schema({
    userEmail:String,
    eventId:Number,
    eventName:String,
    question:String,
    endTime:Date,
    answers:[{ type: Object }],
    votes:{type:Number,default:0},
    Status:{type:String,default:"Active"}
})

let EventModel = mongoose.model("event",eventSchema)


module.exports = {EventModel}