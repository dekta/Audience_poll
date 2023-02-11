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
            let res = await fetch("https://audiencepoll-project.onrender.com/audiencePoll/login",{
            method:"POST",
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            },
            

            })
            let msg = await res.json()
            if(msg.msg==="login successfully"){
                location.replace("polls.html")
            }
           

        }
    }
    catch(err){
        console.log(err)
    }
    
    
}


