

// const httpserver = require("../index")


// const {EventModel} = require("../models/event.model")

// httpserver.get("/",(req,res)=>{
//     res.sendFile(`${process.cwd()}/frontentend/event.html`)
// })

// io.on("connection",(socket)=>{
//     console.log("client connected")
//     socket.emit("price","hello") 
// })
// eventRouter.use(express.json())
// eventRouter.use(cors())




// eventRouter.post("/createEvent",async(req,res)=>{
//     const data = req.body
//     try{
//         const todo =  new EventModel(data)
//         await todo.save()
//         res.send("todo created")
//     }
//     catch(err){
//         res.send(err)
//     }
// })

// module.exports = {eventRouter}