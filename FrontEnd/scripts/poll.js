

const socket = io("https://audience-poll.onrender.com/", { transports : ['websocket'] })

window.addEventListener("load",()=>{
    sendMessage();
})

let poll  = document.getElementById("poll")

let Id = sessionStorage.getItem("EventId")
let question = sessionStorage.getItem("Question")

let Iddiv = document.createElement("div")
Iddiv.setAttribute("class","quesDiv")
let Idp =  document.createElement("p")
let Idh = document.createElement("h3")
Idh.innerText = "EventId: "
Idp.innerText = Id
Iddiv.append(Idh,Idp)

let Quesdiv = document.createElement("div")
Quesdiv.setAttribute("class","quesDiv")
let Quesp =  document.createElement("p")
let Quesh = document.createElement("h3")
Quesh.innerText = "Question: "
Quesp .innerText = question
Quesdiv.append(Quesh,Quesp)

poll.append(Iddiv,Quesdiv)


let ansBtn = document.getElementById('ansBtn')
let answer = document.getElementById("ansIn")
let uname = document.getElementById("uname")


function sendMessage(){
    let ans = answer.value || "welcome"
    let user = uname.value

    if(user==""){
        user = "Anonymous"
    }

    if(ans==""){
        alert("please give answer then send!")
    }
    else{
        socket.emit("msg", ans,Id,user)
    } 
   
}

ansBtn.addEventListener("click",sendMessage)


socket.on('globalEventMessage',(specificEvent,votes)=>{
  console.log(votes)
    let ans = Object.values(specificEvent[0])[0].answer
    AppendAns(ans)

})


function  AppendAns(ans){
    let container = document.getElementById("showAnsDiv")
    container.innerHTML = null
   
   ans.forEach((ele)=>{
        var randomTop, randomLeft;
        var isOverlapping = true;
        var elementWidth = 100;
        var elementHeight = 20;

        while (isOverlapping) {
            randomTop = Math.floor(Math.random() * (container.clientHeight - elementHeight)) + "px";
            randomLeft = Math.floor(Math.random() * (container.clientWidth - elementWidth)) + "px";
        
            isOverlapping = checkOverlap(randomTop, randomLeft, elementWidth, elementHeight);
        }


        let elementDiv = document.createElement("div");
        elementDiv.classList.add("randomText");
        let name = document.createElement("p")
        let msg = document.createElement("p")
        let space = document.createElement("p")
        space.innerText = " :  "

        name.textContent = Object.keys(ele)
        msg.textContent = Object.values(ele);
        msg.style.marginLeft = "5px"
        elementDiv.append(name,space,msg)

        elementDiv.style.position = "absolute";
        elementDiv.style.top = randomTop;
        elementDiv.style.left = randomLeft;
        elementDiv.style.border = "1px solid black"
        elementDiv.style.display = "flex"
        elementDiv.style.padding = "5px"

        let randomColor = getRandomColor();
        name.style.color = randomColor;
        msg.style.color = randomColor
        container.appendChild(elementDiv);
    })
}

function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

  function checkOverlap(top, left, width, height) {
    var elements = document.getElementsByClassName("randomText");
  
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var elementRect = element.getBoundingClientRect();
      var newRect = {
        top: parseInt(top),
        left: parseInt(left),
        width: width,
        height: height,
      };
      if (isRectOverlapping(elementRect, newRect)) {
        return true;
      }
    }
  
    return false;
  }


  function isRectOverlapping(rect1, rect2) {
    return (
      rect1.left < rect2.left + rect2.width &&
      rect1.left + rect1.width > rect2.left &&
      rect1.top < rect2.top + rect2.height &&
      rect1.top + rect1.height > rect2.top
    );
  }


socket.on("delete",(x)=>{
    console.log(x)
})


function home() {
    window.location.href = "index.html";
  }
  