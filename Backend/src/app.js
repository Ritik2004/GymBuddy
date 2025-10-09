const express = require('express');
const app = express();
const connectDb = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
app.use(cors())
app.use(express.json());
app.use(cookieParser());
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
app.use('/',userRouter);
app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);

// Connect to the database
connectDb().then(() => {
    console.log("Database connection established");
    app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})

}).catch(err => {
    console.error("Database connection error:", err);
});


