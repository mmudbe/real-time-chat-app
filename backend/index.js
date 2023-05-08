const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const uuid = require("uuid");
const cors = require("cors");


const app = express();
// use to access body of req not need to use of body-parser.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded()); //Parse URL-encoded bodies

app.use(express.static("public"));
const port = process.env.PORT || 5000;
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer,{
   cors: {
     origin: ["https://real-time-chat-app-mmudbe.vercel.app/", "http://localhost:3000"],
     methods: ["GET","POST"]
   }
 });



// set the view engine to ejs




app.get("/room-id" , (req,res)=> {
 let roomID = uuid.v4();
 return res.status(200).send({"roomId":roomID});
})






io.on("connection", (socket) => {
   console.log("socket connection is created");
   socket.on("join-room" , (name , roomID)=>{
      socket.join(roomID);
      console.log("join the room " + roomID);
      io.to(roomID).emit("user-connected" , name);
   })
   socket.on("send-msg" , (name , roomID , message) => {
      io.to(roomID).emit("show-msg"  , name , message);
      console.log(message);
   })
   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
    console.log('A user disconnected');
 });
  });

httpServer.listen(port , ()=>{
    console.log(`app is listening on port ${port}`)
});