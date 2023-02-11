let mongoose =  require("mongoose")

let ansSchema = mongoose.Schema({
    personName:{type:String, default:"Anonymous"},
    question:String,
    ans:String,
    votes:Number,
    eventCode:Number
})

let AnsModel = mongoose.model("ans",ansSchema)


module.exports = {AnsModel}