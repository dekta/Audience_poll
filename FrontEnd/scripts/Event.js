let token = JSON.parse(sessionStorage.getItem("token"));
let userEmail = JSON.parse(sessionStorage.getItem("userEmail"));
let loadingSection = document.querySelector(".loading_section");

let box = document.getElementById("event-box");


async function AllEvents() {
  box.innerHTML = null;
  let obj = { token: token };
  loadingSection.style.display = "flex"
  let data = await fetch("https://audience-poll.onrender.com/events/allques", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json"
    }
  });
  let res = await data.json();

  loadingSection.style.display = "none"
  if (res) {
    res.forEach((el) => {
      let div = document.createElement("div");
      div.setAttribute("class", "contBox");
      let id = document.createElement("p");
      let ques = document.createElement("p");
      let eventName = document.createElement("p");
      let status = document.createElement("p");
      let h21 = document.createElement("h2");
      let h22 = document.createElement("h2");
      let h23 = document.createElement("h2");
      let h24 = document.createElement("h2");
      h21.innerText = "Event ID: ";
      h22.innerText = "Event Name: ";
      h23.innerText = "Question: ";
      h24.innerText = "Status: ";
      id.innerText = el.eventId;
      eventName.innerText = el.eventName;
      ques.innerText = el.question;
      status.innerText = el.Status
      let div1 = document.createElement("div");
      let div2 = document.createElement("div");
      let div3 = document.createElement("div");
      let div4 = document.createElement("div");
      div1.append(h21, id);
      div2.append(h22, eventName);
      div3.append(h23, ques);
      div4.append(h24,status)
      div.append(div1, div2, div3,div4);
      box.append(div);

      div1.setAttribute("class", "cont");
      div2.setAttribute("class", "cont");
      div3.setAttribute("class", "cont");
      div4.setAttribute("class", "cont");
    });
  }
}

function popup1(){
  if(!token){
    alert("Please login")
  }
  else{
    window.location.href = "#popup1"
  }
}


let starttime = null
let End =null
//connect
let globEventId = null;
const socket = io("https://audience-poll.onrender.com/", { transports: ["websocket"] });

//create event
const createRoomBtn = document.getElementById("createQues");

socket.on('disconnect', () => {
  socket.close();
});


createRoomBtn.addEventListener("click", async () => {
  let eventName = document.getElementById("Aname").value;
  let question = document.getElementById("question").value;
  let endtime = document.getElementById("time").value;
  let eventId = Math.floor(Math.random() * 10000);
  let eventobj = { eventId, eventName, question, time, userEmail };
  starttime = Date.now()
  End = new Date(endtime).getTime();

  if (eventName == "" || question == "" || endtime == "" || eventId == "") {
    alert("please fill the details");
  } 
  else {
    let event = await fetch("https://audience-poll.onrender.com/events/ques", {
      method: "POST",
      body: JSON.stringify(eventobj),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let res = await event.json();
    if(res){
      globEventId = eventId;
      sessionStorage.setItem("eventId", JSON.stringify(eventId));
      AllEvents();
    }

    socket.emit("createEvent", eventId, question, eventName, endtime);
  }
});

const joinBtn = document.getElementById("join_btn");



joinBtn.addEventListener("click", () => {
  const code = document.getElementById("code").value;
  globEventId = code;
  socket.emit("join_room", code);
});

socket.on("sendingEvent", (event) => {
  if (event) {
    sessionStorage.setItem(
      "EventId",
      JSON.stringify(Object.values(event[0])[0].eventId)
    );
    sessionStorage.setItem(
      "Question",
      JSON.stringify(Object.values(event[0])[0].question)
    );
    window.location.replace("polls.html");
  } else {
    alert("No Event here");
  }
});



function home() {
  window.location.href = "index.html";
}

setTimeout(() => {
  socket.on('disconnect', () => {
    socket.close();
  });
  ExpiredEvent()
}, End-starttime); 



async function ExpiredEvent(){
  let eventId = JSON.parse(sessionStorage.getItem("eventId"));
  const event = {
    userEmail:userEmail,
    eventId
  }
 if(eventId){
      let statusUpdate = await fetch("https://audience-poll.onrender.com/events/status", {
        method: "PATCH",
        body: JSON.stringify(event),
        headers: {
          "Content-Type": "application/json"
        }
    });
 }
 AllEvents()
}