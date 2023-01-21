let mongoose =  require("mongoose")

let userSchema = mongoose.Schema({
    firstName:"String",
    lastName:"String",
    email:"String",
    password:"String",
    role:{type:String,enum:["user","premiumUser","admin"],default:"admin"}
})

let UserModel = mongoose.model("user",userSchema)


module.exports = {UserModel}