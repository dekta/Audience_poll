let code =  document.getElementById("Entercode").value
const ans_div = document.getElementById("ans_div")

let Enter =  document.getElementById("enter")
Enter.onclick = (e)=>{

    let code =  document.getElementById("Entercode")
    AppendAns()
   
    code.value=""
    
}

async function AppendAns(){
    let obj = {eventCode:code}
    let data = await fetch("https://audience-poll.onrender.com/events/getAns",{
        method:"POST",
        body: JSON.stringify(obj),
        headers: {
                'Content-Type': 'application/json'
        },
                
    })

    let res = await data.json()
    console.log(res)
    res.forEach((el)=>{
        let div = document.createElement("div")
        div.setAttribute("class","ansDiv")
        let name = document.createElement("p")
        name.innerText = el.personName
        let question= document.createElement("p")
        question.innerText=  el.question
        let ans= document.createElement("p")
        ans.innerText = el.ans
        div.append(name,question,ans)
        ans_div.append(div)

    })

}



// let home = document.getElementById("home")
// home.onclick = ()=>{
//     location.replace("events.html")
// }