const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
       firstName:{
        type:String,
        required:true,
       },
       lastName:{
        type:String,
       },
        emailId:{
        type:String,
        required:true,
        unique:true,
       },
       password:{
        type:String,
       },
       age:{
        type:Number,
       },
       gender:{
        type:String,
        enum:['male','female','other'],
       },
       photoUrl:{
       type:String,
       default:'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='
       },
       about:{
        type:String,
        default:'Hello! I am using DevConnector.',
       },
       skills:{
        type:[String],
       }
},
{timestamps:true}
)

const User = mongoose.model('User',userSchema);
module.exports = User;
