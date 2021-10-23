const Router = require('express').Router();
const User = require('../models/users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config()
const {registrationValidation,loginValidation} = require('../connection/validation');

Router.post('/register' ,async(req,res)=>{
    
    //joi validation
    const{error} = registrationValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

   //Encrypting the password
   const salt = await bcrypt.genSalt(10);
   const hashPassword = await bcrypt.hash(req.body.password,salt)

   // get information from users
    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password:hashPassword,
        salt:salt

            })
    // check wheather the email is registered already 
    try{
    const userConfirmation = await User.findOne({email: req.body.email});
    if(userConfirmation) return res.status(400).send("User already exist");
    const saveduser = await user.save();
    res.send(saveduser);
    }
    catch(err)
    {
        res.status(400).send(err);
    }


   // res.send('Registration page')
});


Router.post('/login', async (req, res)=>{
    //joi validation at login page
    const{error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  //get user informations
    const user = new User({
        email:req.body.email,
        password:req.body.password
});
//check wheather the user is registered or not
    try{
        const userConfirmation =await  User.findOne({ email : req.body.email });
        if(!userConfirmation) return res.status(400).send("User not exist");
  
        //To compare the inputed password and stored password
        const validate = await bcrypt.compare(req.body.password,userConfirmation.password);
        if(!validate) return res.status(400).send("Invalid Password");

        
        //creating a  unique token foe authentication
        const token = jwt.sign({ id: userConfirmation._id},process.env.SECRET_JWT, {expiresIn: "2d"  });// it will be expired after 20 days
           
        
        if(!token) return res.status(500);
        res.header("auth-token",token).send(token);


        //res.send("logged in")

    }
    catch(err)
    
    {
        res.status(400).send(err);
    }


   // res.send('Registration page')
});

module.exports = Router;