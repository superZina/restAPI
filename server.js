const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const server = express();
const User = require('./models/User');
require("dotenv").config({ path : './variables.env' });

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get('/',(req,res)=>{
    const newUser = new User();
    newUser.email = "dkwlsfk22@naver.com";
    newUser.name = "이진하";
    newUser.phone = 1033662794 ;
    newUser.save()
        .then((user)=>{
            console.log(user);
            res.json({
                message:" User Created Successfully"
            });
        })
        .catch((err)=>{
            res.json({
                message:" User was not Created Successfully"
            });
        });
});
//Create User
server.post('/api/User',(req,res)=>{
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;

    user.save(function(err){
        if(err){
            console.error(err);
            res.json({result : 0});
            return;
        }

        res.json({result: 1});

    })
})

//Update user
server.put('')

server.listen(3000, err =>{
    if(err){
        return console.log(err);
    }else{
        mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser : true} , (err) => {
            if(err){
                console.log(err);
            }else{
                console.log("Connected to DB Successfully")
            }
        });
    }
});