let info = document.getElementById("info")

let btn = document.getElementById("btn")
let body = document.querySelector("body")
let signup = document.getElementById("signup")
let signupPop = document.createElement("div")
signupPop.setAttribute("id","signupPop")
let h3 = document.createElement("h3")
h3.innerText = "Congrats! Signup Successfully"
let okBtn = document.createElement("button")
okBtn.innerText = "OK"
okBtn.setAttribute("id","okbtn")
okBtn.onclick =()=>{
    window.location.href = "login.html"
}
let logo = document.createElement("img")
logo.setAttribute("id","logoimg")
logo.src = "./images/Ap-removebg-preview.png"
signupPop.append(logo,h3,okBtn)


//singup
btn.onclick=async()=>{
    let firstName = document.getElementById("fname").value
    let lastName = document.getElementById("lname").value
    let email = document.querySelector(".email").value
    let password = document.querySelector(".pass").value
    try{
        if(firstName=='' || lastName==''||email==''||password==''){
            alert("please fill all details")
        }
        else{
            let data = {
                firstName,
                lastName,
                email,
                password
            }
            let res = await fetch("https://audience-poll.onrender.com/audiencePoll/signup",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

            })
            let msg = await res.json()
            
            if(msg.msg=="congrats! signup successfully"){
                signup.style.display = "none"
                body.append(signupPop)
            }
            else{
                alert(msg.msg)
            }

            }
        
    }
    catch(err){
        console.log(err)
    }

    
}





function home(){
    window.location.href = "index.html"
}

