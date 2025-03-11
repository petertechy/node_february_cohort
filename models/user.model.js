const mongoose = require("mongoose")

let UserSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now() },
  });
  
  let UserModel = mongoose.model(
    "user_collection",
    UserSchema,
    "user_collection"
  );

  module.exports = UserModel