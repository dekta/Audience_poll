// let nav = document.querySelector(".navbar");
//     window.addEventListener('scroll',() => {

//         if(window.scrollY >= 50){
//             nav.classList.add("active_navbar")
//             nav.classList.add("active_navbar a")
//         }
//         else{
//             nav.classList.remove("active_navbar")
//         }
//     })



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

const clientServer = io("http://localhost:8050/", { transports : ['websocket'] })
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
        
        clientServer.emit("event",obj)
        location.href = "polls.html"
    }
    
}


