const express = require('express')
const {userAuth} = require('../middleware/auth');
const requestRouter = express.Router();
const User = require('../model/user');
const ConnectionRequestmodel = require('../model/connectionRequest');
requestRouter.post('/request/send/:status/:toUserId',userAuth, async (req, res) => {
   try{
       const fromUserId = req.user._id;
       const toUserId = req.params.toUserId;
       const status = req.params.status;
       
       const allowedStatus = ['ignored','interested']
    
       if(!allowedStatus.includes(status)){
        return res.status(400).send({message:`${status} is not allowed`});
       }
        
        //check if fromUserId and toUserId are same
        if(fromUserId.equals(toUserId)){
            return res.status(400).json({message:"You cannot send request to yourself"});
        }

        //check if toUserId is valid
        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({message:"User not found"});
        }

       //check if there is a existing connection request already from A to B or if there is a coonection
       //request pending from B to A
      
       const existingconnectionRequest = await ConnectionRequestmodel.findOne({
        $or:[
            {fromUserId,toUserId},
            {fromUserId:toUserId,toUserId:fromUserId}
        ]
       })
       if(existingconnectionRequest){
        return res.status(400).send({message:"Connection request already exists or you are already connected"});
       }
       const connectioRequest = new ConnectionRequestmodel({
        fromUserId,
        toUserId,
        status
       });

       const data = await connectioRequest.save();

       res.json({
        message:"Request sent successfully",
       data,
       });
   } 
   catch(err){
      res.status(400).send("ERROR: ", + err.message);
   }   

})

requestRouter.post('/request/review/:status/:requestId',userAuth, async(req,res)=>{
     try{
       
        const loggedInUser = req.user;
        const{status,requestId} = req.params;

        const allowedStatus = ["accepted","rejected"]
        if(!allowedStatus.includes(status)){
            return res.status(400).send({message:`${status} is not allowed`});
        }

        console.log("Checking for request with:", {
  _id: requestId,
  toUserId: loggedInUser._id,
  status: "interested",
});
        const connectionRequest = await ConnectionRequestmodel.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested"
        })
          if(!connectionRequest){
            return res.status(404).send({message:"No connection request found"});
          }

        connectionRequest.status = status;
       const data = await connectionRequest.save();
    res.json({message:`Request ${status} successfully`,data});

     }
     catch(err){
        res.status(400).send({message:err.message});
     }
})

module.exports = requestRouter;