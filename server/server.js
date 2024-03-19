//create express app
const exp=require('express')
const app=exp();
const path=require('path')

//connect angular app with server
app.use(exp.static(path.join(__dirname,'../client/dist/client/browser')))

//configure environment variables
require('dotenv').config()

//add body parsing middlewares
app.use(exp.json())

//import api
const userApp=require('../server/APIs/user-api')
const sellerApp=require('../server/APIs/seller-api')
const bookApp=require('../server/APIs/book-api')


//forward req to userApp when path starts with /user-api
app.use('/user-api',userApp)
app.use('/seller-api',sellerApp)
app.use('/book-api',bookApp)

app.use((req,res,next)=>{
    res.sendFile((path.join(__dirname, '../client/dist/client/browser/index.html')));
})
//error handler
app.use((err,req,res,next)=>{
    res.send({message:err.message,payload:err})
})



//assig a port number

const PORT=process.env.PORT|| 4000;
app.listen(PORT,()=>console.log(`web server is listening on port no ${PORT}`))