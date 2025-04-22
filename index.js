// console.log("This is my server")
//Modularization - MVC
// import express from "express"
const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const {greetUsers} = require("abeokuta-package")
dotenv.config();
const cors = require("cors");
const adminRouter = require("./routes/admin.route");
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use("/", adminRouter);
app.set("view engine", "ejs");
const PORT = process.env.PORT;
let allUsers = [];
let URI = process.env.MONGODB_URI;
//connect to Mongodb
console.log(greetUsers('Esther'))
mongoose
  .connect(URI)
  .then(() => {
    console.log("Mongodb iyaf connected successfully");
    // console.log(response)
  })
  .catch((err) => {
    console.log(err);
  });
let connection = app.listen(PORT, () => {
  console.log(`The server have started on port ${PORT}`);
});

let socketServer = require('socket.io')
let io = socketServer(connection, {
  cors: {orgin: "*"}
})

io.on("connection", (socket)=>{
  console.log(socket.id)
  console.log("A user connected successfully")
  socket.on("sendMsg", (message)=>{
    console.log(message)
    io.emit("broadcastMsg",message)
  })
  socket.on("disconnet", ()=>{
    console.log("User Disconnected")
  })
})
