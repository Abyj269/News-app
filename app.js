const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
const Router = require('./routes/authroute')
const postRouter = require('./routes/postroute')
const mongooseConnection = require('./connection/mongodb');
const { mongo } = require('mongoose');
const { json } = require('express');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

mongooseConnection()
app.get('/',(req,res)=>{
    res.send(`Connected to server on Portno :${PORT}`)
})

app.use('/api',Router)
app.use('/api/post',postRouter)


const PORT = process.env.PORT || 8080
app.listen(PORT,(err,res)=>{
    if(err) throw error;
   
    console.log(`Connected to server on Portno :${PORT}`)

})
