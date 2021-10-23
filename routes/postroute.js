const Posts = require('../models/posts');
const Router = require('express').Router();
const verify = require('../connection/verifyToken');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/users');
const path = require('path');


Router.post("/addpost",verify,(req, res, next) => {
        console.log(req.body)
        const url = req.protocol + "://" + req.get("host")
        console.log(url)
        var author = {
          id: req.userData.userId,
          email: req.userData.email,
        };
            const post = new Posts({
            postTitle: req.body.postTitle,
            description: req.body.description,
            author:{
              id: req.userData.userId,
              email: req.userData.email
            },
            //creator: req.userData.userId,
            postDate: req.body.postDate,
        })
    
        console.log(post)
        post.save().
            then(post => {
                if(post){
                    res.status(201).json({
                        message: "Post added successfully",
                        post: {
                            ...post,
                            id: post._id
                        }
                    })
                }

                    if(!post){
                        res.status(404).json({
                            message: "Error Adding Post",
                          
                        })
                    }
               
                
            })
            .catch(e => {
                console.log(e)
                res.status(501).json({ message: "Error Adding Post"+e });
            })
    })


    
Router.get("/mypost", verify,(req, res, next) => {
  var author = {
    id: req.userData.userId,
    email: req.userData.email,
  };
    const post = new Posts({
        _id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        author:author
    })
    Posts.find({author: req.userData.email}).then(post => {
      if (post) {
        res.status(200).json({
            message: "Posts fetched successfully!",
            posts: post
        });
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    })
    .catch(e=>{
        console.log(e)
    });
  });
  



Router.get("", (req, res, next) => {
    Posts.find().then(documents => {
        if(documents){
            res.status(200).json({
                message: "Posts fetched successfully!",
                posts: documents
            });
        }
        else{
            res.status(404).json({ message: "Post not found!" });
        }
       
    });
});



Router.get("/:id", (req, res, next) => {
    Posts.findById(req.params.id).then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found!" });
      }
    });
  });
  




  Router.delete("/:id", verify, (req, res, next) => {
    Posts.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
      result => {
        console.log(result);
        if (result.n > 0) {
          res.status(200).json({ message: "Deletion successful!" });
        } else {
            return res.status(401).json({ message: "Not authorized!!" });
        }
      }
    );
  });


  module.exports = Router
