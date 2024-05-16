const jwt = require("jsonwebtoken");
require('dotenv').config()

 const VerifyToken=(req,res,next)=>{
    let bearerToken = req.headers.authorization
    if(!bearerToken){
        return res.send({message:"Unauthorized Access! Please Login."})
    }
 
    let token = bearerToken.split(' ')[1]
    try{
        let decodedToken = jwt.verify(token,process.env.SECRET_KEY)
        next()
    }catch(err){
        next(err)
    }
}

module.exports = VerifyToken