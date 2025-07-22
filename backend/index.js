import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/db/connectDB.js';
import userRouter from "./src/routes/userRoutes.js";
import messageRouter from "./src/routes/messageRoutes.js"
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { app,server } from './src/lib/socket.js';
import path from "path"
dotenv.config();

const PORT = process.env.PORT;
const _dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
    origin: "https://whatsup-t1cl.onrender.com",
    credentials: true,
  })
);

connectDB();

app.use("/user/api",userRouter);
app.use("/message/api",messageRouter);

app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get('/{*any}',(_,res)=>{
  res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})
server.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})