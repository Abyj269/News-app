const mongoose = require('mongoose')
require('dotenv').config()

const mongoConnection = ()=>{
  /*  return mongoose.connect(process.env.MONGO_CONNECTION_URL,()=>{
    console.log("Connected to MONGO DATABASE")
    })*/
    mongoose.connect('mongodb://localhost:27017/newsapp',{useNewUrlParser:true,useUnifiedTopology:true})

const db = mongoose.connection
db.on('error',(err)=>{
    console.log(err)
})
db.once('open',()=>{
    console.log("Database connection established")
})

}


module.exports = mongoConnection


