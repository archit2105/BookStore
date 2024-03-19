const User=require('../db').User
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");
require('dotenv').config()

//create new User
const createUser=async(req,res)=>{

    //check for existing user with same username
    let existingUser = await User.findOne({ username: req.body.username });
    //user already existed
    if (existingUser !== null) {
      return res.status(200).send({ message: "User already existed" });
    }
    //if user not existed, then hash password
    const hashedPassword = await bcryptjs.hash(req.body.password, 6);
    //replace plain password with hashed pw
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
   
    res.status(201).send({ message: "User created", payload: newUser });
   
   }




   const getUserByUsername=async(req,res)=>{
    let currentUser=req.params.username;
    const userList=await User.findOne({username:currentUser})
    res.send({message:"get user by username",payload:userList})
   }


   
   
   //User login
   const loginUser = async (req, res) => {
       //get user crdentials object from req
       const userCredentials = req.body;
       //check username
       let user = await User.findOne({ username: userCredentials.username });
       //if invalid username
       if (user === null) {
         return res.status(200).send({ message: "Invalid username" });
       }
       //if username is found, compare passwords
       const result = await bcryptjs.compare(
         userCredentials.password,
         user.password
       );
       //if pasword not matched
       if (result === false) {
         return res.status(200).send({ message: "Invalid password" });
       }
       //Create jwt token and sign it
       const signedToken = jwt.sign(
         { username: user.username },
         process.env.SECRET_KEY,
         { expiresIn: '1d' }
       );
       res
         .status(200)
         .send({ message: "login success", token: signedToken, user: user });
     };
   

     
     //update the user by username(add to cart)
     const updateUser=async(req,res)=>{

      let currentUser=req.params.username;
      let productData=req.body;

      let findUser=await User.findOne({username:currentUser})


      if(findUser===null){
        res.send({messgae:"User not found"})
      }
      else{
        findUser.cart.push(req.body)
        let updatedUser=await User.findOneAndUpdate({username:currentUser},findUser)

        res.send({message:"user is updated",payload:findUser})
      }


     }
     const deleteFromCart=async(req,res)=>{
let username=req.params.username;
let data=req.body.abc;
let result=await User.findOneAndUpdate({username:username},{"$pull":{cart:{isbn:data}}})
res.send({message:"product removed",payload:result})  
}
  

     //export
module.exports={createUser,loginUser,updateUser,deleteFromCart,getUserByUsername}