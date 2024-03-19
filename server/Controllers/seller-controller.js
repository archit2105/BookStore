const {Seller}=require('../db')
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");
require('dotenv').config()

//create new Seller
const createSeller=async(req,res)=>{

    //check for existing seller with same username
    let existingUser = await Seller.findOne({ username: req.body.username });
    //seller already existed
    if (existingUser !== null) {
      return res.status(200).send({ message: "Seller already existed" });
    }
    //if seller not existed, then hash password
    const hashedPassword = await bcryptjs.hash(req.body.password, 6);
    //replace plain password with hashed pw
    req.body.password = hashedPassword;
    const newSeller = await Seller.create(req.body);
   
    res.status(201).send({ message: "Seller created", payload: newSeller });
   
   }

   //seller login
   const loginSeller = async (req, res) => {
    //get seller crdentials object from req
    const sellerCredentials = req.body;
    //check username
    let seller = await Seller.findOne({ username: sellerCredentials.username });
    //if invalid username
    if (seller === null) {
      return res.status(200).send({ message: "Invalid username" });
    }
    //if username is found, compare passwords
    const result = await bcryptjs.compare(
      sellerCredentials.password,
      seller.password
    );
    //if pasword not matched
    if (result === false) {
      return res.status(200).send({ message: "Invalid password" });
    }
    //Create jwt token and sign it
    const signedToken = jwt.sign(
      { username: seller.username },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
    res
      .status(200)
      .send({ message: "login success", token: signedToken, seller: seller });
  };

   module.exports={createSeller,loginSeller}