const mongoose =  require("mongoose")
require("dotenv").config()

const connect =  mongoose.connect("mongodb+srv://dekta:ekta@cluster0.ptfuawe.mongodb.net/Audience-Poll?retryWrites=true&w=majority")


module.exports = {connect}