// console.log("This is my server")

// import express from "express"

const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
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

//User Schema

let UserSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  date: { type: String, default: Date.now() },
});

let UserModel = mongoose.model(
  "user_collection",
  UserSchema,
  "user_collection"
);

const endpoint = [
  { firstname: "Emmanuel", lastname: "SQI" },
  { firstname: "Esther", lastname: "SQI" },
  { firstname: "Habeeb", lastname: "SQI" },
  { firstname: "Yemi", lastname: "SQI" },
  { firstname: "Olanrewaju", lastname: "SQI" },
  { firstname: "Abiola", lastname: "SQI" },
  { firstname: "Martha", lastname: "SQI" },
];

app.get("/about", (req, res) => {
  // res.send("This is my About Page")
  res.sendFile(__dirname + "/index.html");
  console.log(__dirname);
});

app.get("/", (request, response) => {
  // response.send("This is my landing page")
  response.render("index");
});

app.get("/users", (req, res) => {
  res.send(endpoint);
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/register", (req, res) => {
  // console.log(req.body)
  let form = new UserModel(req.body);
  form
    .save()
    .then(() => {
      console.log("User info saved successfully");
      console.log(form);
      res.redirect("/dashboard")
      res.send({ status: true, message: "Correct Submission", form });
    })
    .catch((err) => {
      console.log(err);
      res.send({ status: false, message: "Invalid input" });
    });
  // allUsers.push(req.body)
  // console.log(allUsers)
  // res.send("Successfully registered")
});

app.get("/dashboard", (req, res) => {
  UserModel.find()
    .then((allUsers) => {
      res.render("dashboard", {
        name: "Olanrawaju",
        gender: "male",
        users: allUsers,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/delete/:id", (req, res) => {
  const { id } = req.params;
  console.log({id})
  UserModel
    .findByIdAndDelete(id)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404).send("User not found");
      }
      res.redirect("/dashboard");
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

app.listen(PORT, () => {
  console.log(`The server have started on port ${PORT}`);
});
