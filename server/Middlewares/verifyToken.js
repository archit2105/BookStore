
const jwt=require('jsonwebtoken')
require('dotenv').config()

function verifyToken(req,res,next){
    //token verification logic
        //get bearer token from headers of req object
        const bearerToken=req.headers.authorization;
        //get token
        if(bearerToken){

        //verify the token
        let decodedToken=jwt.verify(bearerToken,process.env.SECRET_KEY)
       
        next()

        }else{
            res.status(403).send({message:"Unauthorised access"})
        }

}


module.exports=verifyToken;