// create a route (mini exp app)

const exp = require("express");
const sellerApp = exp.Router();

//get express-async-handler to handel async error
const expressAsyncHandler = require("express-async-handler");
const verifyToken = require("../Middlewares/verifyToken");

//import req handler from Controller

const {
  createSeller,
  loginSeller,
} = require("../Controllers/seller-controller");

//user CRUD
//create seller
sellerApp.post("/seller", expressAsyncHandler(createSeller));
//login seller
sellerApp.post("/login", expressAsyncHandler(loginSeller));
//export sellerApp
module.exports = sellerApp;
