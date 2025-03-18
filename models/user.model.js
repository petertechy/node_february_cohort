const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

let UserSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now() },
  });

  // Using Bycrypt to hash user password
  let saltRound = 10
  UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, saltRound, (err, hashedPassword)=>{
      // console.log(this.password)
      // console.log(hashedPassword)
      if(err){
        console.log("There is an error setting up password", err)
      }else{
        this.password = hashedPassword
        next()
      }
    })
  })

  //Compare hashed password and user inputted password
  UserSchema.methods.validatePassword = function(password, callback){
    console.log(this.password, password)
    bcrypt.compare(password, this.password, (err, same)=>{
      if(!err){
        console.log(same)
        callback(err, same)
      }else{
        next()
      }
    })
  }

  
  
  let UserModel = mongoose.model(
    "user_collection",
    UserSchema,
    "user_collection"
  );

  module.exports = UserModel