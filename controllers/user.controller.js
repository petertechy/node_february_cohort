const UserModel = require('../models/user.model')
const jwt = require("jsonwebtoken")
const cloudinary = require("cloudinary")
const nodemailer = require("nodemailer")
const getWelcomeEmail = require("../utils/welcomeEmail");
//Thunderclient, swagger, postman, insomia

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_SECRET_KEY
});

const landingPage = (req,res)=>{
    // response.send("This is my landing page")
    res.render("index");
}

const addUser = (req, res) => {
  let form = new UserModel(req.body);
  form
    .save()
    .then(() => {
      console.log("User info saved successfully");

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER,
          pass: process.env.PASS
        }
      });

      const mailOptions = {
        from: 'petertechy01@gmail.com',
        to: [req.body.email, "yemmit@gmail.com", "ikolabaolanrewaju@gmail.com"],
        subject: 'Welcome to My Jumia App',
        html: getWelcomeEmail(req.body.firstname)
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      console.log(form);
      res.send({ status: true, message: "Correct Submission", form });
    })
    .catch((err) => {
      console.log(err);
      res.send({ status: false, message: "Invalid input" });
    });
};


const editUser = (req, res) =>{
    const {id} = req.params;
    const {firstname, lastname, email, age} = req.body
  
    UserModel.findByIdAndUpdate(
      id,
      {firstname, lastname, email, age},
      {new: true}
    )
    .then((response)=>{
      console.log(response)
      res.redirect('/dashboard')
    }).catch((err)=>{
      console.log(err)
    })
}

const deleteUser = (req, res) =>{
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
}

// const getDashboard = (req, res) =>{
//     UserModel.find()
//       .then((allUsers) => {
//         res.render("dashboard", {
//           name: "Olanrewaju",
//           gender: "male",
//           users: allUsers,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
// }

const getDashboard = (req, res) =>{
  let token = req.headers.authorization.split(" ")[1]
  // console.log(token)
  jwt.verify(token, "secret", (err, result)=>{
    if(err){
      console.log(err)
      res.send({status: false, message: "Invalid token or expired"})
    }else{
      console.log(result)
      let email = result.email
      UserModel.findOne({email:email},)
      .then((user)=>{
        res.send({status:true, message: "valid token",user})
      })
      
    }
  })
}


const endPoint = (req, res) =>{
    const endpoint = [
  { firstname: "Emmanuel", lastname: "SQI" },
  { firstname: "Esther", lastname: "SQI" },
  { firstname: "Habeeb", lastname: "SQI" },
  { firstname: "Yemi", lastname: "SQI" },
  { firstname: "Olanrewaju", lastname: "SQI" },
  { firstname: "Abiola", lastname: "SQI" },
  { firstname: "Martha", lastname: "SQI" },
];

res.send(endpoint);
}

const signUpPage = (req, res) =>{
    res.render("signup")
}

const aboutPage = (req, res) =>{
    res.send("This is my About Page")
    res.sendFile(__dirname + "/index.html");
    console.log(__dirname);
}

const signInUsers = (req, res)=>{
  // console.log(req.body)
  let {password} = req.body
  UserModel.findOne({email: req.body.email})
  .then((user)=>{
    // console.log(user)
    if(user){
      // console.log("email is valid")
      user.validatePassword(password, (err, same)=>{
        // console.log(password)
        if(!same){
          res.send({status: false, message: "Invalid Credentials"})
        }
        else{
          let token = jwt.sign({email: req.body.email}, "secret",{expiresIn: "1h"})
          // console.log(token)
          res.send({status: true, message: "Correct Info", token})
        }
      })
    }else{
      res.send({status: false, message: "Invalid credentials"})
    }
  })
  .catch((err)=>{
    console.log(err)
  })
}

const fileUpload = (req, res)=>{
  // console.log(req.body.file)
  let file = req.body.file
  cloudinary.v2.uploader.upload(file, (err, result)=>{
    if(err){
      console.log("File could not be uploaded to cloudinary")
    }

    else{
      console.log(result.secure_url)
      let imageLink = result.secure_url
      res.send({status: true, message: "Image Uploaded", imageLink})
    }
  })
}


module.exports = {addUser, editUser, deleteUser, getDashboard, landingPage, endPoint, signUpPage, aboutPage, signInUsers, fileUpload}