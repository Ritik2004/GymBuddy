const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',//reference to User model
        required:true
    },
    toUserId:{
         type:mongoose.Schema.Types.ObjectId,
        ref: 'User',//reference to User model
            required:true
    },
    status:{
        type:String,
        required:true,
        enum:['ignore','interested','accepted','rejected'],
        message:`{VALUE} is not supported`
    }

},{
    timestamps:true
})

connectionRequestSchema.index({fromUserId:1,toUserId:1});

const ConnectionRequestmodel = mongoose.model('ConnectionRequest',connectionRequestSchema);
module.exports = ConnectionRequestmodel;