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

let eventId = 0
const io = new Server(httpserver)
io.on("connection",(socket)=>{
    console.log("hi from server")
    socket.on("event",function(data){
        const code = Math.floor(Math.random()*10000)
        eventId = Math.floor(Math.random()*1000)
        data["EventId"] = eventId
        data["eventCode"] = code
        const event_token = jwt.sign({ EventId:eventId ,eventCode:code}, 'shhhhh');
        Verify(event_token)
        let newEvent = new EventModel(data)
        newEvent.save()
        
    }) 

    function Verify(token){
        socket.on("event_info",function(token){
            const decoded = jwt.verify(token, 'shhhhh');
            //console.log(decoded)
    
        })  
    }
   
})

// eventRouter.post("/createEvent",async(req,res)=>{
//         const data = req.body
//         try{
//             const todo =  new EventModel(data)
//             await todo.save()
//             res.send("todo created")
//         }
//         catch(err){
//             res.send(err)
//         }
//     })
    














