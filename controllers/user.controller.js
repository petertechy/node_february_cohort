const UserModel = require('../models/user.model')

const landingPage = (req,res)=>{
    // response.send("This is my landing page")
    res.render("index");
}

const addUser = (req, res) =>{
    // console.log(req.body)
    let form = new UserModel(req.body);
    form
      .save()
      .then(() => {
        console.log("User info saved successfully");
        console.log(form);
        // res.redirect("/dashboard")
        res.send({ status: true, message: "Correct Submission", form });
      })
      .catch((err) => {
        console.log(err);
        res.send({ status: false, message: "Invalid input" });
      });
    // allUsers.push(req.body)
    // console.log(allUsers)
    // res.send("Successfully registered")
}

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

const getDashboard = (req, res) =>{
    UserModel.find()
      .then((allUsers) => {
        res.render("dashboard", {
          name: "Olanrewaju",
          gender: "male",
          users: allUsers,
        });
      })
      .catch((err) => {
        console.log(err);
      });
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
    console.log(user)
    if(user){
      // console.log("email is valid")
      user.validatePassword(password, (err, same)=>{
        console.log(password)
        if(!same){
          res.send({status: false, message: "Invalid Credentials"})
        }
        else{
          res.send({status: true, message: "Correct Info"})

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


module.exports = {addUser, editUser, deleteUser, getDashboard, landingPage, endPoint, signUpPage, aboutPage, signInUsers}