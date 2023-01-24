
const ques_div = document.getElementById("ques_div")

async function AppendQues(){
    let data = await fetch("http://localhost:8050/events/allques",{
        method:"GET",
        headers: {
            'Authorization':"token",
            'Content-Type': 'application/json'
        },
        
    })
    let res = await data.json()
    //console.log(res)
    res.forEach((el)=>{
        let div = document.createElement("div")
        div.setAttribute("class","event_div")
        let ques = document.createElement("p")
        ques.innerText ="Question:"+ el.question
        let code = document.createElement("p")
        code.innerText= "Event Code:" + el.eventCode
        let date1 = el.startDate
        date1.split("T")[0]
       let sDate = document.createElement("p")
       sDate.innerText = date1.split("T")[0]
       let date2 = el.startDate
        date2.split("T")[0]
        let eDate = document.createElement("p")
       eDate.innerText = date2.split("T")[0]

       div.append(code,ques,sDate,eDate)
       ques_div.append(div)

    })

}

AppendQues()