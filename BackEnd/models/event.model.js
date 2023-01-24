let mongoose =  require("mongoose")

let eventSchema = mongoose.Schema({
    EventId:Number,
    eventCode:Number,
    startDate:{type:Date},
    endDate:Date,
    eventName:String,
    pollType:String,
    eventLink:String,
    question:String,
    pollDescription:String,
    liveResult:String,
    votes:Number
})

let EventModel = mongoose.model("event",eventSchema)


module.exports = {EventModel}