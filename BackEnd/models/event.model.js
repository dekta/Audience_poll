let mongoose =  require("mongoose")

let eventSchema = mongoose.Schema({
    EventId:Number,
    eventCode:Number,
    startDate:Date,
    endDate:Date,
    eventName:String,
    pollType:String,
    eventLink:String,
    question:String,
    multipleAns:[
        {
        name:{type:String,default:"Anonymous"},
        ans:String
        }
    ],
    pollDescription:String,
    liveResult:String,
    votes:Number
})

let EventModel = mongoose.model("event",eventSchema)


module.exports = {EventModel}