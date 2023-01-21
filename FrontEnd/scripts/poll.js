

const clientServer = io("http://localhost:8050/", { transports : ['websocket'] })


let question = document.getElementById("question").value

clientServer.emit("event_info",question)

//let data =  "hello"
//socket.emit("msg",data)

// socket.on("ans",function(data){
//     console.log(data)
// }) 

