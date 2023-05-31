

const socket = io("https://audience-poll.onrender.com/", { transports: ['websocket'] })

window.addEventListener("load", () => {
  sendMessage();
})

// Getting the loggedin user data from session storage for input box because we want to give the default name of sender if he don't want write his name.

let loggedInUser = sessionStorage.getItem("userName")



let poll = document.getElementById("poll")
let Id = sessionStorage.getItem("EventId")
let question = sessionStorage.getItem("Question")

let Iddiv = document.createElement("div")
Iddiv.setAttribute("class", "quesDiv")
let Idp = document.createElement("p")
let Idh = document.createElement("h3")
Idh.innerText = "EventId: "
Idp.innerText = Id
Iddiv.append(Idh, Idp)

let Quesdiv = document.createElement("div")
Quesdiv.setAttribute("class", "quesDiv")
let Quesp = document.createElement("p")
let Quesh = document.createElement("h3")
Quesh.innerText = "Question: "
Quesp.innerText = question
Quesdiv.append(Quesh, Quesp)

poll.append(Iddiv, Quesdiv)


let ansBtn = document.getElementById('ansBtn')
let answer = document.getElementById("ansIn")
let uname = document.getElementById("uname")
uname.defaultValue = loggedInUser?.split("").slice(1,loggedInUser.length-1).join("") || ""



function sendMessage() {
  let ans = answer.value || "welcome"
  let user = uname.value

  if (user == "") {
    user = "Anonymous"
  }

  if (ans == "") {
    alert("please give answer then send!")
  }
  else {
    socket.emit("msg", ans, Id, user)
  }
  answer.value = ""
}

ansBtn.addEventListener("click", sendMessage)


socket.on('globalEventMessage', (specificEvent, votes) => {
  let ans = Object.values(specificEvent[0])[0].answer
  AppendAns(ans)
})



function getRandomPosition(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkOverlap(element, otherElements) {
  const rect1 = element.getBoundingClientRect();
  for (let i = 0; i < otherElements.length; i++) {
    const rect2 = otherElements[i].getBoundingClientRect();
    if (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    ) {
      return true;
    }
  }
  return false;
}



function AppendAns(ans) {
  const childWidth = 50;
  const childHeight = 50;
  const maxAttempts = 50;
  let parentDiv = document.getElementById("showAnsDiv")
  parentDiv.innerHTML = null
  
  ans.forEach((ele,i) => {
    const child = document.createElement('div');
    child.className = 'child';
    child.setAttribute("class","child")
    let spanLabelTag = document.createElement("span")
    let spanDataTag = document.createElement("span")
    let resultArray = Object.keys(ele);
    spanLabelTag.innerText = resultArray[0];
    spanDataTag.innerText = ele[resultArray[0]];
    spanDataTag.style.color  =  getRandomColor()
    spanLabelTag.style.color = "#2077e8"
    child.append(spanLabelTag," : ",spanDataTag)
    parentDiv.appendChild(child);

    let posX, posY;
    let attempts = 0;
    do {
      posX = getRandomPosition(0, parentDiv.offsetWidth - childWidth);
      posY = getRandomPosition(0, parentDiv.offsetHeight - childHeight);
      child.style.left = posX + 'px';
      child.style.top = posY + 'px';
      attempts++;
    } while (
      checkOverlap(child, Array.from(parentDiv.getElementsByClassName('child')).slice(0, i)) &&
      attempts < maxAttempts
    );

    if (attempts >= maxAttempts) {
      // Reset the position if it fails to find a non-overlapping position
      child.style.left = '';
      child.style.top = '';
    }
  })
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color+80;
}




socket.on("delete", (x) => {
  console.log(x)
})


function home() {
  window.location.href = "index.html";
}
