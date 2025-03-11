// console.log("This is my server")
//Modularization - MVC 
// import express from "express"
const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const adminRouter = require('./routes/admin.route')
app.use(express.urlencoded({ extended: true }));
app.use('/', adminRouter)
app.set("view engine", "ejs");
const PORT = 5700;
let allUsers = [];
let URI =
  "mongodb+srv://ikolabaolanrewaju:olanrewaju09@cluster0.3jaoi.mongodb.net/Jumia_database?retryWrites=true&w=majority&appName=Cluster0";
//connect to Mongodb
mongoose
  .connect(URI)
  .then(() => {
    console.log("Mongodb iyaf connected successfully");
    // console.log(response)
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(PORT, () => {
  console.log(`The server have started on port ${PORT}`);
});