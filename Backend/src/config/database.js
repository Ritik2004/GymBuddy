const mongoose = require('mongoose');

const connecDb = async() => {
    try{
       await mongoose.connect('mongodb://localhost:27017/namastedb') 
         console.log("Database connected");
    }
    catch(err){
        console.log(err);
    }
}
module.exports = connecDb;