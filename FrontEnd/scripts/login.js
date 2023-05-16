let login_btn = document.getElementById("loginbtn");

//login
login_btn.onclick = async () => {
  let userName = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("pass").value;
  //console.log(email,password)
  try {
    if (email == "" || password == "" || userName == "") {
      alert("Please fill all details");
    } else {
      let obj = {
        userName,
        email,
        password
      };
      let res = await fetch("https://audience-poll.onrender.com/audiencePoll/login", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json"
        }
      });

      let response = await res.json();
      if (response.msg === "login successfully") {
        let userName = response.userName;
        let token = response.token;
        let userEmail = response.email;

        sessionStorage.setItem("userName", JSON.stringify(userName));
        sessionStorage.setItem("userEmail", JSON.stringify(userEmail));
        sessionStorage.setItem("token", JSON.stringify(token));
        window.location.href = "index.html";
      } else {
        alert(response.msg);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

function home() {
  window.location.href = "index.html";
}
