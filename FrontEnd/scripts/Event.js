



function Random(){
    let p = document.querySelector(".event-3-1-b")
    let country = ["India","Germany","USA","Hong Kong","Japan","France","UK"]
    for(let i=0;i<country.length;i++){
        let div = document.createElement("div")
        div.setAttribute("class","random")
        let h3 = document.createElement("h3")
        h3.innerText = country[i]
        div.append(h3)
        p.append(div)
    }
}

Random()

const clientserver = io('https://audiencepoll-project.onrender.com/',{ transports : ['websocket'] })
let create = document.getElementById("create")
create.onclick=()=>{
    let startDate = document.getElementById("sDate").value
    let endDate = document.getElementById("eDate").value
    let eventName = document.getElementById("Aname").value
    if(startDate==''||endDate==''||eventName==''){
        alert("please fill all details")
    }
    else{
        let obj ={
            startDate,
            endDate,
            eventName,
        }
        clientserver.emit("event",obj)
        
    }
    
}

const btn_create = document.getElementById("open_text_create")


clientserver.on("eventInfo",(data)=>{
     btn_create.onclick = ()=>{
        const question = document.getElementById("quess").value 
        data["question"]=question
        data["pollType"] = "OpenText"
        clientserver.emit("add_details",data)

    }

})

let msg_btn = document.getElementById("msg_btn")
let  votes= 0
clientserver.on("msg",(data)=>{
    console.log(data)
    const Eventcode = document.getElementById("show_code")
    Eventcode .innerText = data.eventCode
    const questions = document.getElementById("show_ques")
    questions.innerText = data.question
    let question = data.question
    let code = data.eventCode
    votes++
    msg_btn.onclick = ()=>{
        const ans = document.getElementById("in_msg").value
        const client_code = document.getElementById("event_code").value
        const personName = document.getElementById("p_name").value
        let obj={
            personName,
            ans,
            eventCode:code,
            question,
            votes
        }
        console.log(obj)
        if(code==client_code){
            clientserver.emit("clientMsg",obj)
        }
        else{
            alert("wrong code")
        }
       
    }
})






 



