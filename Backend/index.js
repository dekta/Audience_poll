//packages
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const http = require("http");
const { Server } = require("socket.io");


//connect to db
const { connect } = require("./config/db");

//routes and modules import
const { user } = require("./routes/user.route");
const { EventModel } = require("./models/event.model");
const { EventRouter } = require("./routes/event.route");

const app = express();
app.use(express.json());
app.use(cors());

const httpserver = http.createServer(app);

//base route
app.get("/", function (req, res) {
  res.send("welcome to Audience Poll");
});

app.use("/audiencepoll", user);
app.use("/events", EventRouter);

//connection
httpserver.listen(9500, async (req, res) => {
  try {
    await connect;
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }

  console.log("server");
});




let events = [];   //all events
const io = new Server(httpserver);
let votes = 0;

//socket code start
io.on("connection",(socket) => {
  
  //create Event
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

      
      io.to(socket.id).emit("event",event)   //emit event to creator
      events.push(event);
      socket.join(eventId);

      
        setTimeout(() => {
          deleteRoom(eventId)
          io.on('disconnect', (socket) => {
            socket.close();
          });

        }, End-starttime); 
      
    } 
    else {
      socket.close();
    }

   
  });

//delete room after given time
function deleteRoom(eventId){
    if(io.sockets.adapter.rooms.has(eventId)){
      io.of("/").adapter.on("delete-room", (eventId) => {
        console.log(`room ${eventId} deleted`);
        socket.emit("delete", eventId)
      });
    }
}

  
//join room
  socket.on("join_room", (eventId) => {
    if(eventId==null) return;
    votes += 1
    const specificEvent = events?.filter(
      (ele) => Object.keys(ele) == String(eventId)
    );
    socket.join(eventId);
  
    io.to(eventId).emit("sendingEvent", specificEvent);
   
  });

//message route
  socket.on("msg", async(answer, eventId,user) => {
    const specificEvent = events?.filter(
      (ele) => Object.keys(ele) == String(eventId)
      );
     
      if(specificEvent[0]){
        if(answer!=="welcome"){
          let obj = {[user]:answer}
          specificEvent[0][eventId].answer.push(obj)
          socket.join(eventId);
          EventModel.updateOne({ eventId }, { $push: { answers: obj } }, (err, result) => {
            if (err) {
              console.error("Error adding answer:", err);
            } else {
              console.log("Answer added successfully:", result);
            }
          }) 
          io.to(eventId).emit("globalEventMessage", specificEvent,votes);
        }
        else{
          socket.join(eventId);
          io.to(eventId).emit("globalEventMessage", specificEvent,votes);
        }
      }
      else{
        io.on('disconnect', (socket) => {
          socket.close();
        });
      }
    
    });



});
