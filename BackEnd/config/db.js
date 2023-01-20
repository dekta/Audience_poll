const mongoose =  require("mongoose")

const connect =  mongoose.connect("mongodb+srv://dekta:ekta@cluster0.ptfuawe.mongodb.net/AudiencePoll?retryWrites=true&w=majority")


module.exports = {connect}