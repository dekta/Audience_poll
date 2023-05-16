window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

$(document).ready(function(){
    $(".ans-1").hide();
    $(".ans-2").hide();
    $(".ans-3").hide();
    $(".ans-4").hide();
})

$(document).ready(function(){
    $(".ques-1").click(function(){
      $(".ans-1").fadeIn();
      $(".ans-2").hide();
      $(".ans-3").hide();
      $(".ans-4").hide();
    });
  });

  $(document).ready(function(){
    $(".ques-2").click(function(){
      $(".ans-2").fadeIn();
      $(".ans-1").hide();
      $(".ans-3").hide();
      $(".ans-4").hide();
    });
  });

  $(document).ready(function(){
    $(".ques-3").click(function(){
      $(".ans-3").fadeIn();
      $(".ans-1").hide();
      $(".ans-2").hide();
      $(".ans-4").hide();
    });
  });

  $(document).ready(function(){
    $(".ques-4").click(function(){
      $(".ans-4").fadeIn();
      $(".ans-1").hide();
      $(".ans-2").hide();
      $(".ans-3").hide();
    });
  });


let userName = JSON.parse(sessionStorage.getItem("userName"))
let menu = document.querySelector(".menu")
if(userName){
  handleLogin(userName)
}


function handleLogin(userName){
  let csignUp = document.getElementById("signup")
  csignUp.style.display = "none"
  let cLogin = document.getElementById("login")
  cLogin.style.display = "none"

  let user = document.createElement("li")
  let a1 = document.createElement("a")
  a1.setAttribute("class","menu-btn")
  a1.innerText = userName
  user.append(a1)

  let logout = document.createElement("li")
  logout.setAttribute("id","logout")
  let a2 = document.createElement("a")
  a2.setAttribute("class","menu-btn")
  a2.innerText = "Logout"
  logout.append(a2)

  menu.append(user,logout)

}

let out = document.getElementById("logout")
if(out){
  out.onclick = () =>{
    console.log("hi")
    sessionStorage.removeItem("userName")
    window.location.reload()
  }
}


let handleEvent = document.getElementById("handleEvent")

handleEvent.addEventListener("click",()=>{
  let token = JSON.parse(sessionStorage.getItem("token"))
  if(token){
    window.location.href = "events.html"
  }
  else{
    alert("please login !")
  }
})
