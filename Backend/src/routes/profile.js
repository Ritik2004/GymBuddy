const express = require('express');
const profileRouter = express.Router(); 
const {userAuth} = require('../middleware/auth');
const {validateProfileEdit} = require('../utils/validation');
profileRouter.get('/profile/view',userAuth ,async (req,res)=>{
       try{
         const user = req.user;
         res.send(user)
       }
       catch(err){
        res.status(500).send({message:err.message});
       }
})

profileRouter.patch('/profile/edit',userAuth,async (req,res)=>{
   try{
     validateProfileEdit(req);
     //this below line will give the user id from the token 
     const loggedInuser = req.user; 
     Object.keys(req.body).forEach((key)=>(loggedInuser[key]=req.body[key]))
        await loggedInuser.save();
    res.send({message:"Profile updated successfully",user:loggedInuser})
   }
   catch(err){
    res.status(500).send({message:err.message});
   }

})

profileRouter.patch('/profile/forgot-password',async (req,res)=>{
     try{
           const {emailId,newPassword} = req.body;
           if(!emailId || !newPassword){
            return res.status(400).send({message:"emailId and newPassword are required"});
           }
              const user = await User.findOne({emailId});
              if(!user){
                return res.status(404).send({message:"User not found"});
              }     
                const pwdhash = await bcrypt.hash(newPassword,10);
                user.password = pwdhash;
                await user.save();
                res.send({message:"Password updated successfully"});
     } 
        catch(err){ 
        res.status(500).send({message:err.message});
        }

})
module.exports = profileRouter;