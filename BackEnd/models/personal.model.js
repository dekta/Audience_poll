let mongoose =  require("mongoose")

let personalSchema = mongoose.Schema({
    field:String,
    howToUse:String,
    toAchieve:String,
    accountName:String,
    userID:String,
    firstName:String

})

let PersonalModel = mongoose.model("personalized",personalSchema)


module.exports = {PersonalModel}