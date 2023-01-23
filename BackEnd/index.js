const express = require("express")
const jwt = require("jsonwebtoken")
const cors = require('cors')
const cookieParser = require('cookie-parser')

const http = require("http")

const {Server} =  require("socket.io")





const {connect} = require("./config/db")
const {user} = require('./home')
const {signupAuthenticate} = require("./middleware/signup_authentication")
const {authenticate} = require('./middleware/authorization')
const {personalRouter} = require('./routes/personal.route')
const {EventModel} =  require("./models/event.model")
const {AnsModel} = require("./models/ans.model")



const app =  express()
app.use(express.json())
app.use(cors())


const httpserver = http.createServer(app)





app.get("/",(req,res)=>{
    res.send("ok")
})

app.use("/audiencepoll",user)
app.use("/userOnbording",signupAuthenticate,personalRouter)

httpserver.listen(8050,async(req,res)=>{
    try{
        await connect
        console.log("connected to db")
    }
    catch(err){
        console.log(err)
    }
    console.log("server")
})
let event = []
const io = new Server(httpserver)
io.on("connection",(socket)=>{
    console.log("hi from server")
    socket.on("event",function(data){
        const code = Math.floor(Math.random()*100000)
        data["eventCode"] = code
        event.push(data)
        socket.emit("eventInfo",data)
    })
     

    socket.on("add_details",function(data){
        let event = new EventModel(data)
        event.save()
        let eventCode = data.eventCode
        let question = data.question
        let obj = {
            eventCode,
            question
        }
        socket.emit("msg",obj)
        
    })

    socket.on("clientMsg",(data)=>{
        let ans =  new AnsModel(data)
        ans.save()
        console.log(ans)
    })
    
   
})




    














