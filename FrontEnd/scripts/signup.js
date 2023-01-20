let info = document.getElementById("info")

let btn = document.getElementById("btn")


btn.onclick=async()=>{
    console.log("hi")
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
            let res = await fetch("http://localhost:8050/audiencePoll/signup",{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)

            })
            let msg = await res.json()
            alert(msg.msg)
            }
        
    }
    catch(err){
        console.log(err)
    }

    
}