import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
export default function JoinRoom() {
  const location = useLocation();
  const [socket, setSocket] = useState(null);
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // extract name and roomId from URL
    const searchParams = new URLSearchParams(location.search);
    const nameParam = searchParams.get("name");
    const roomIdParam = searchParams.get("roomId");
    setName(nameParam);
    setRoomId(roomIdParam);

    // establish socket connection when component mounts
    const newSocket = io("real-time-chat-app-psi.vercel.app" || "http://localhost:5000")

    setSocket(newSocket);

    // clean up socket connection when component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, [location.search]);

  useEffect(() => {
    // join room when name and roomId are set
    if (name && roomId) {
      socket.emit("join-room", name, roomId);
    }
  }, [name, roomId, socket]);

  const handleSendMessage = (event) => {
    event.preventDefault();
    const message = event.target.elements.message.value;
    if (message) {
      socket.emit("send-msg", name, roomId, message);
      setMessages([...messages, { sender: "Me", message }]);
      event.target.elements.message.value = "";
    }
  };

  useEffect(() => {
    // listen for incoming messages from server
    if (socket) {
      socket.on("show-msg", (userName, message) => {
        setMessages([...messages, { sender: userName, message }]);
      });
    }
  }, [socket, messages]);

  return (
    <div>
      <h1>Room</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
          {message.sender !== name ? (
            <><strong>{message.sender}: </strong>{message.message}</>
          ) : null}
       </div>  
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input type="text" name="message" />
        <button type="submit">Send Message</button>
        
      </form>
    </div>
  );
}
