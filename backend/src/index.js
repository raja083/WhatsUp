import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

// Correct __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // change to your frontend domain in production
    credentials: true,
  })
);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Production setup to serve frontend
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../frontend/dist");
  const indexHtmlPath = path.join(distPath, "index.html");

  console.log("🔍 Checking for frontend build at:", indexHtmlPath);

  if (fs.existsSync(indexHtmlPath)) {
    console.log("✅ Frontend build found, enabling static serving.");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(indexHtmlPath);
    });
  } 
}

// Start server
server.listen(PORT, () => {
  console.log("✅ Server is running on PORT:", PORT);
  connectDB();
});
