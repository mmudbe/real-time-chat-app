var socket = io();

let name = "";
let roomID = "";

let query = window.location.search ;
const urlParams = new URLSearchParams(query);
name = urlParams.get("name");
roomID = urlParams.get("roomId");
// console.log(roomID);
// console.log(name);
socket.emit("join-room", name,roomID);
 
socket.on("user-connected" , (name) => {
    let room = document.querySelector(".room");

    let element = document.createElement("div");
   element.innerHTML =  `<h2>${name} has joined the room</h2>`;
    
    room.append(element);

    
})

let submitBtn = document.querySelector(".submit-msg");
submitBtn.addEventListener("click" , () =>{
    let message = document.querySelector(".text-msg").value;
    if (message === "") {
        
    } else {
        socket.emit("send-msg" , name , roomID ,message);
        let room = document.querySelector(".room");

        let element = document.createElement("div");
       element.innerHTML =  `<p>Me : ${message}</p>`;
        
        room.append(element);
        document.querySelector(".text-msg").value = "";
    }
});

socket.on("show-msg" , (userName , message)=>{
if(name !== userName ){
    let room = document.querySelector(".room");

    let element = document.createElement("div");
   element.innerHTML =  `<p>${userName} : ${message}</p>`;
    
    room.append(element);
}else{

}
})

