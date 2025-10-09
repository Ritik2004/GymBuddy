const express = require('express');
const User = require('../model/user');
const {validateSignup} = require('../utils/validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authrouter = express.Router();

authrouter.post('/signup',async(req,res)=>{

    try{
    validateSignup(req)
        const {firstName,lastName,emailId} = req.body;
     const pwd = req.body.password;
     
     const pwdhash = await bcrypt.hash(pwd,10);
     const user = new User({
        firstName,
        lastName,
        emailId,
        password:pwdhash
     });
    
     await user.save();
        res.status(201).send({message:"User signed up successfully",user});

    }catch(err){
        res.status(500).send({ message: err.message });
    }
});

authrouter.post('/login',async(req,res)=>{
   try{
    const {emailId,password} = req.body;  
    const user = await User.findOne({emailId});
    if(!user){
        return res.status(404).send({message:"Invalid credentials"});
    }
    const ispwdvalid = await bcrypt.compare(password,user.password);

    if(ispwdvalid){

        //create a jwt token
        const token = jwt.sign({_id:user._id},"jwtsecretkey",{expiresIn:'1d'});
        console.log(token);
        //add a token to cookie and send response to user
        res.cookie("token",token);
        res.send("Login successful");
    }

    if(!ispwdvalid){
        return res.status(401).send({message:"Invalid credentials"});
    }
    // res.status(200).send({message:"User logged in successfully",user});      
   }
   catch(err){
    res.status(500).send({message:err.message});
   }
})

authrouter.post('/logout',async(req,res)=>{
    // res.clearCookie("token");
    // res.send("User logged out successfully");
    
    res.cookie("token",null,{expires:new Date(0)});
    res.send("User logged out successfully");
})


module.exports = authrouter;