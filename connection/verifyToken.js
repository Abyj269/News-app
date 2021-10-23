const jwt = require('jsonwebtoken');
require('dotenv').config()
const path = require('path');
const verify = (req,res,next)=>{
    const token = req.header("auth-token");
    
    if(!token) return res.status(400).send('access denied');
    try{
        const verified = jwt.verify(token,process.env.SECRET_JWT)
        req.userData = { email: verified.email, userId: verified.userId };
        next();
    }
    catch(err){
        res.status(401).json({ message: "Auth failed!" });
    }

}

module.exports = verify

