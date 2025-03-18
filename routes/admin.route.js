const express = require("express");
const {
  addUser,
  getDashboard,
  deleteUser,
  editUser,
  landingPage,
  endPoint,
  signUpPage,
  aboutPage,
  signInUsers,
} = require("../controllers/user.controller");
const { addProduct } = require("../controllers/product.controller");
const router = express.Router();

router.get("/about", aboutPage);

router.get("/", landingPage);

router.get("/users", endPoint);

router.get("/signup", signUpPage);

router.post("/register", addUser);

router.get("/dashboard", getDashboard);

router.post("/delete/:id", deleteUser);

router.post("/edit/:id", editUser);

router.post("/add-product", addProduct)

router.post("/signin", signInUsers)

module.exports = router;
