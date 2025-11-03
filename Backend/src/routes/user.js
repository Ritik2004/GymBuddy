const express = require('express');
const userRouter = express.Router();
const {userAuth} = require('../middleware/auth');
const ConnectionRequestmodel = require('../model/connectionRequest');
const User = require('../model/user');
//get all pending requests for a login user
userRouter.get('/user/requests/received',userAuth, async (req,res)=>{
     try{
       const loggedInuser = req.user;
       const connectionRequest = await ConnectionRequestmodel.find({
        toUserId:loggedInuser._id,
        status:'interested'
       }).populate("fromUserId",["firstName","lastName","photoUrl"])

       res.json({
        message:"Connection requests fetched successfully",
        data:connectionRequest
       })
     }
     catch(err){
        res.status(400).send("ERROR: ", + err.message);
     }
})
//get all connections for a login user
userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
       //check in the table where loggedin user is either fromUserId or toUserId and status is accepted
         const loggedInuser = req.user;
         const connectionRequest = await ConnectionRequestmodel.find({
            $or:[
                {toUserId:loggedInuser._id,status:'accepted'},
                {fromUserId:loggedInuser._id,status:'accepted'}
            ]
         }).populate("fromUserId",["firstName","lastName","photoUrl"])
            .populate("toUserId",["firstName","lastName","photoUrl"]);

           const data = connectionRequest.map((row)=>
                 {
                 if(row.fromUserId._id.toString() ===loggedInuser._id.toString()){
                    return row.toUserId
                 }             
           return row.fromUserId
}
        )

         res.json({data});
    }
    catch(err){
        res.status(400).send("ERROR: ", + err.message);
    }
})

userRouter.get("/feed",userAuth,async(req,res)=>{
    try{
       //users should see all the user card expect
       //1) His own card
       //2) Users to whom he has sent request already
       //3) His connections
       //4) ignore people
      
       const loggedInUser = req.user;
       //find all connection request (send+recieved)

       const page = parseInt(req.query.page) || 1;
       let limit = parseInt(req.query.limit) || 10;
       limit = limit>50?50:limit;
       const skip = (page - 1) * limit;
       const connectionRequest = await ConnectionRequestmodel.find({
        $or:[
            {fromUserId:loggedInUser._id},
            {toUserId:loggedInUser._id}
        ]
       })
       .select("fromUserId toUserId")

       const hideUserFromFeed = new Set();
       connectionRequest.forEach((req)=>{
        hideUserFromFeed.add(req.fromUserId.toString());
        hideUserFromFeed.add(req.toUserId.toString());
       })
      
       const users = await User.find({
        $and:[
            {_id:{$nin:Array.from(hideUserFromFeed)}},
            {_id:{$ne:loggedInUser._id}}
        ]
       }).select("firstName lastName photoUrl age gender about skills")
       .skip(skip).limit(limit);
       

      res.send(users);

    }
    catch(err){
        res.status(400).send("ERROR: ", + err.message);
    }
})


module.exports = userRouter;