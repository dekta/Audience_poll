let mongoose =  require("mongoose")

let eventSchema = mongoose.Schema({
    startDate:Date,
    endDate:Date,
    eventName:String,
    pollType:String,
    eventLink:String,
    eventCode:Number,
    questions:[String],
    multipleAns:{
        name:{type:String,default:"Anonymous"},
        ans:[String]
    },
    pollDescription:String,
    liveResult:String,
    votes:Number
})

let EventModel = mongoose.model("event",eventSchema)


module.exports = {EventModel}