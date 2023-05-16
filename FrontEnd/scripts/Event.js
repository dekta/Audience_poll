let token = JSON.parse(sessionStorage.getItem("token"));
let userEmail = JSON.parse(sessionStorage.getItem("userEmail"));
console.log(userEmail);
let box = document.getElementById("event-box");
AllEvents();
async function AllEvents() {
  box.innerHTML = null;
  let obj = { token: token };
  console.log(obj);
  let data = await fetch("https://audience-poll.onrender.com/events/allques", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json"
    }
  });
  let res = await data.json();
  console.log(res);
  if (res) {
    res.forEach((el) => {
      let div = document.createElement("div");
      div.setAttribute("class", "contBox");
      let id = document.createElement("p");
      let ques = document.createElement("p");
      let eventName = document.createElement("p");
      let h21 = document.createElement("h2");
      let h22 = document.createElement("h2");
      let h23 = document.createElement("h2");
      h21.innerText = "Event ID:";
      h22.innerText = "Event Name:";
      h23.innerText = "Question:";
      id.innerText = el.eventId;
      eventName.innerText = el.eventName;
      ques.innerText = el.question;
      let div1 = document.createElement("div");
      let div2 = document.createElement("div");
      let div3 = document.createElement("div");
      div1.append(h21, id);
      div2.append(h22, eventName);
      div3.append(h23, ques);
      div.append(div1, div2, div3);
      box.append(div);

      div1.setAttribute("class", "cont");
      div2.setAttribute("class", "cont");
      div3.setAttribute("class", "cont");
    });
  }
}

//connect
const socket = io("https://audience-poll.onrender.com/", { transports: ["websocket"] });
let globEventId = null;

//create event
const createRoomBtn = document.getElementById("createQues");

createRoomBtn.addEventListener("click", async () => {
  let eventName = document.getElementById("Aname").value;
  let question = document.getElementById("question").value;
  let endtime = document.getElementById("time").value;
  console.log(eventName, question, time, userEmail);
  let eventId = Math.floor(Math.random() * 10000);
  let eventobj = { eventId, eventName, question, time, userEmail };

  if (eventName == "" || question == "" || endtime == "" || eventId == "") {
    alert("please fill the details");
  } else {
    let event = await fetch("https://audience-poll.onrender.com/events/ques", {
      method: "POST",
      body: JSON.stringify(eventobj),
      headers: {
        "Content-Type": "application/json"
      }
    });
    let res = await event.json();
    // console.log(res)
    AllEvents();
    globEventId = eventId;

    socket.emit("createEvent", eventId, question, eventName, endtime);
  }
});

const joinBtn = document.getElementById("join_btn");

//event detail for user that created event
socket.on("event", (event) => {
  console.log(event);
});

joinBtn.addEventListener("click", () => {
  const code = document.getElementById("code").value;
  globEventId = code;
  socket.emit("join_room", code);
});

socket.on("sendingEvent", (event) => {
  console.log(event);
  console.log(Object.values(event[0])[0].eventId);
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
