

const socket = io("https://audience-poll.onrender.com/", { transports : ['websocket'] })


let poll  = document.getElementById("poll")

let Id = sessionStorage.getItem("EventId")
let question = sessionStorage.getItem("Question")
console.log("EventId",Id)
console.log("question",question)


let h11=  document.createElement("h1")
h11.innerText = Id

let h22 =  document.createElement("h1")
h22.innerText = question

poll.append(h11,h22)


let ansBtn = document.getElementById('ansBtn')
let answer = document.getElementById("ansIn")
let uname = document.getElementById("uname")


ansBtn.addEventListener("click",()=>{
    let ans = answer.value
    let user = uname.value
    socket.emit("msg", ans,Id,user)
})


socket.on('globalEventMessage',(specificEvent)=>{
    let ans = Object.values(specificEvent[0])[0].answer
    AppendAns(ans)

})



function  AppendAns(ans){
    let showans = document.getElementById("showAnsDiv")
    showans.innerHTML = null
   ans.forEach((ele)=>{
    let h3 = document.createElement("h3")
    h3.innerText = Object.values(ele)
    showans.append(h3)
   })
}


socket.on("delete",(x)=>{
    console.log(x)
})


let welapopUp = document.getElementById("welapopUp")

let p = document.getElementById("p")
p.innerText = "WelCome"
let Wbtn  = document.getElementById("button")
Wbtn.innerText = "click"
welapopUp.append(p,Wbtn)