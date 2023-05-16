const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const http = require("http");

const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");

const { connect } = require("./config/db");
const { user } = require("./routes/user.route");

const { EventModel } = require("./models/event.model");
const { EventRouter } = require("./routes/event.route");

const app = express();
app.use(express.json());
app.use(cors());

const httpserver = http.createServer(app);

app.get("/", function (req, res) {
  res.send("ok");
});

app.use("/audiencepoll", user);

app.use("/events", EventRouter);

httpserver.listen(8500, async (req, res) => {
  try {
    await connect;
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }

  console.log("server");
});




let events = [];
let votes = 0;
const io = new Server(httpserver);

io.on("connection",(socket) => {
  let roomTimer
 
  socket.on("createEvent", async(eventId, question,eventName,endtime) => {
   let starttime = Date.now()
   End = new Date(endtime).getTime();
    const existingQuestion = events.filter((ele) => ele.eventId === eventId);
    if (existingQuestion <= 0) {
      let event = {
        [eventId]: {
          eventId,
          question,
          answer:[],
          eventName
        }
      };

      io.to(socket.id).emit("event",event)
      events.push(event);
      socket.join(eventId);

      console.log(End-starttime)
      setTimeout(() => {
        deleteRoom(eventId)
        socket.disconnect();

      }, End-starttime); 
      
    } else {
      io.emit("event","no-event")
    }

   
  });


  function deleteRoom(eventId){
    if(io.sockets.adapter.rooms.has(eventId)){
      console.log(eventId)
      io.of("/").adapter.on("delete-room", (eventId) => {
        console.log(`room ${eventId} deleted`);
        socket.emit("delete", eventId)
      });
    }
}

  

  socket.on("join_room", (eventId) => {
    if(eventId==null) return;
     votes += 1
    const specificEvent = events?.filter(
      (ele) => Object.keys(ele) == String(eventId)
    );

    socket.join(eventId);
   // console.log(specificEvent)
    io.to(eventId).emit("sendingEvent", specificEvent);
   
  });


  socket.on("msg", async(answer, eventId,user) => {
    
    let obj = {[user]:answer}
    
    const specificEvent = events?.filter(
      (ele) => Object.keys(ele) == String(eventId)
    );
    specificEvent[0][eventId].answer.push(obj)
    socket.join(eventId);

    EventModel.updateOne({ eventId }, { $push: { answers: obj } }, (err, result) => {
      if (err) {
        console.error("Error adding answer:", err);
      } else {
        console.log("Answer added successfully:", result);
      }
    });

    
    io.to(eventId).emit("globalEventMessage", specificEvent);
    
  });



});
