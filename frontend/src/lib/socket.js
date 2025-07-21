// lib/socket.js
import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  if (socket?.connected) return socket;

  socket = io("http://localhost:4000", {
    query: { userId },
    withCredentials: true,
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket?.connected) socket.disconnect();
  socket = null;
};
