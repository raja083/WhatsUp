import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://whatsup-t1cl.onrender.com",
    credentials:true
  },
});

// used to store online users
const userSocketMap = {}; // {userId: socketId}

export function getReceiverSocketId(userId) { //returns the socket id of the receiver
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id; //insert the user and its socket id in userSocketMap

  // io.emit() is used to send events to all the connected clients
  socket.on("ready-for-online-users", () => {
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
  socket.on("disconnect", () => { 
    
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };