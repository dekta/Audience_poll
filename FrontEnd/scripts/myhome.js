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