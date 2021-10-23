const { string } = require('joi');
const mongoose = require('mongoose')

const path = require('path');
//const { post } = require('../routes/postroute');
const postSchema = new mongoose.Schema({
    postTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    postDate: {
        type: String,
        required: true
    },

    author: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        email: String,
      }
});

/*
const ObjectId = new mongoose.Schema({ creator : mongoose.ObjectId });

const carSchema = new mongoose.Schema({ driver: mongoose.ObjectId });

const Car = mongoose.model('Car', carSchema);

const car = new Car();
car.driver = new mongoose.Types.ObjectId();

typeof car.driver; // 'object'
car.driver instanceof mongoose.Types.ObjectId; // true

car.driver.toString();
*/

module.exports = mongoose.model('Post',postSchema);

