let mongoose =  require("mongoose")

let userSchema = mongoose.Schema({
    name:"String",
    email:"String",
    password:"String",
    role:{type:String,enum:["user","writer","admin"],default:"user"}
})

let UserModel = mongoose.model("user",userSchema)


module.exports = {UserModel}