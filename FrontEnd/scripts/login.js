let login_btn = document.getElementById("btn")

login_btn.onclick=async()=>{
    console.log("hi")
    let email = document.getElementById("email").value;
    let password = document.getElementById("pass").value

    try{
        if(email =='' || password==''){
            alert("fill all details")
        }
        else{
            let obj = {
                email,
                password
            }
            let res = await fetch("http://localhost:8050/audiencePoll/login",{
            method:"POST",
           body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            },
            

            })
            let msg = await res.json()
            alert(msg.msg)
            location.replace("events.html")

        }
    }
    catch(err){
        console.log(err)
    }
    
    
}


