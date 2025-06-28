import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// Online users: { userId: socketId }
const userSocketMap = {};

// Create Socket.IO server with CORS config
const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? "https://whatsup-frontend-94e3.onrender.com"
        : "http://localhost:5173",
    credentials: true,
  },
});

// Utility to get receiver socket ID
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
    socket.data.userId = userId; // ✅ Bind userId to socket
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  console.log("🟢 Online users:", userSocketMap);

  socket.on("disconnect", () => {
    const userId = socket.data.userId; // ✅ Safe from closure issues
    if (userId) {
      delete userSocketMap[userId];
    }
    console.log("❌ A user disconnected:", socket.id);
    console.log("🟡 Online users after disconnect:", userSocketMap);

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
