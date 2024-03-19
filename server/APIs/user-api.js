// create a route (mini exp app)

const exp=require('express');
const userApp=exp.Router();

//get express-async-handler to handel async error
const expressAsyncHandler=require('express-async-handler')
const verifyToken=require('../Middlewares/verifyToken')

//import req handlers from Controller
const {createUser,loginUser, updateUser, deleteFromCart, getUserByUsername}=require('../Controllers/user-controller')

//user CRUD
//create user
userApp.post('/user',expressAsyncHandler(createUser))
//user login
userApp.post('/login',expressAsyncHandler(loginUser))
//add to cart
userApp.put('/user/:username',expressAsyncHandler(updateUser))
//delete cart
userApp.post('/user/:username',verifyToken,expressAsyncHandler(deleteFromCart))
//get user by username
userApp.get('/user/:username',expressAsyncHandler(getUserByUsername))

//export userAPP
module.exports=userApp