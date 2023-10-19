import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { ChatWidget } from "react-chat-widget";
const Chat = () => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = io();
    setSocket(socket);
    socket.on("connect", () => {
      console.log("Connected to the server!");
    });
    socket.on("message", (data) => {
      console.log("Received a message:", data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  const sendMessage = (message) => {
    socket.emit("message", message);
  };
  return (
    <div>
      <ChatWidget
        title="Chat"
        senderName="Me"
        onMessage={(message) => sendMessage(message)}
      />
    </div>
  );
};
export default Chat;