//import mongoose
const mongoose=require('mongoose')

//connect to db
mongoose.connect('mongodb://0.0.0.0:27017/db')
.then(()=>console.log("success"))
.catch(err=>console.log("error",err))


//create user Scvhema
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is required here']
       
    },
    email:{
        type:String,
        required:[true,"email is required"]
    }, 
      password:{
        type:String,
        required:[true,'Password is required'],
        minLength:[6,'minimum length is 6']
    }
    ,
    cart:[{
    
    }]
})

//seller Schema
const sellerSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is required here']
       
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },   password:{
        type:String,
        required:[true,'Password is required'],
        minLength:[6,'minimum length is 6']
    }
})

const bookSchema=new mongoose.Schema({
    Titel:{
        type:String,
        required:[true,"Titel is required"]
    },
    isbn:{
        type:Number,
        required:[true,"isbn is required"]
    },
    pageCount:{
        type:Number,
        required:[true,"page coun is required"]  
    },image:{
        type:String,
        required:[true,"image Url is required"]
    },
    shortDescription:{
        type:String,
        required:[true,"Short description is required"] 
    },longDescription:{
        type:String,
        required:[true,"Long description is required"] 
    },author:{
        type:String,
        required:[true,"Author is required"] 
    },
    categories:{
        type:String,
        required:[true,"Categories is required"] 
    },
    price:{
        type:Number,
        required:[true,"Price is required"]    
    },
   discount:{
        type:Number,
        required:[true,"Discount is required"]
    }
})

//create Model(class) for the userSchema
const User=mongoose.model('user',userSchema)
//create Model(class) for sellerSchema
const Seller=mongoose.model('seller',sellerSchema)
//create Model(class) for sellerSchema
const Book=mongoose.model('book',bookSchema)

//export user model
module.exports={User,Seller,Book};
// module.exports=Seller;