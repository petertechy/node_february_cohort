const ProductModel = require("../models/product.model")

const addProduct = (req, res)=>{
    let form = new ProductModel(req.body);
    form
      .save()
      .then(() => {
        console.log("Product info saved successfully");
        console.log(form);
        res.redirect("/product")
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

const editProduct = (req, res)=>{

}

module.exports = {addProduct, editProduct}