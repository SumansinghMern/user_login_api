const path = require('path')
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://sonu:t80rQQFSpbZeUg7b@cluster0.pizod.mongodb.net/userdata?retryWrites=true&w=majority'


const authRoutes = require('./routes/auth')


const app = express();


app.use(bodyParser.json()); 


app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization')
    next();
})

app.get("/",(req,res) => {
    res.send("Welcome To User API Server")
})


app.use('/auth',authRoutes)



app.use((error,req,res,next) => {
    console.log(error,"Error From eroor Handler!");
    const staus = error.statusCode || 500;
    const message = error.message;
    const data = error.data || {}
    res.status(staus).json({message:message,data:data})

})

mongoose.connect(MONGODB_URI)
    .then(result => {
        app.listen(8081,() => {
            console.log("Server is Listning on 8081");
        })
    })
    .catch(err => console.log(err,"DataBase Connection error"));