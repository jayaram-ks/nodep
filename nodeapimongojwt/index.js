const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

//Connect to mongo atlas db cloud
try {
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true},()=>{
    console.log('connected to db');
})
} catch(error){
    console.log(error)
}
const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

//Import Routes
const authRoute = require('./routes/auth') 
const profileRoute = require('./routes/userProfile')

//Middleware body parser as json app level
app.use(express.json());

//Route middleware for prefix applied to authroute
app.use('/api/user',authRoute);
app.use('/api/user',profileRoute)

app.listen(3300,() => console.log("server running"));