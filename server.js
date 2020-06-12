
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');
var async = require('async');
var url = 'mongodb+srv://dbamdin:admin1234!@cluster0-9wasi.mongodb.net/test?retryWrites=true&w=majority'

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');
require("dotenv").config({ path : './variables.env' });


const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//Read User
server.get('/api/User',(req,res)=>{

    
    User.find(function(err, users){
        if(err) return res.status(500).send({error : 'databas failure'});
        res.json(users);
    })
});




//Create User
server.post('/api/User',(req,res)=>{
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.id = req.body.id;
    user.password = req.body.password;

    user.save(function(err){
        if(err){
            console.error(err);
            res.json({result : 0});
            return;
        }

        res.json({result: 1});

    })

})

server.post('/connect_mongodb',function(req,res){
    console.log('connect mongodb....');

    connect_mongodb(res);
})

server.post('/connect_mongodb/find',function(req,res){
    console.log('find mongodb.....');

    find_gps(res);
})

//Update user
server.put('/api/User/:user_id',function(req,res){
    User.update({_id: req.params.user_id},{$set: req.body}, function(err,output){
        if(err) res.status(500).json({error : ' database failure'});
        console.log(output);
        if(!output.n) return res.status(404).json({error : 'User not found'});
        res.json({message: 'User updated'});
    })
});

//Delete user
server.delete('/api/User/:user_id',function(req,res){
    User.remove({_id: req.params.user_id},{$set: req.body},function(err,output){
        if(err) res.status(500).json({error : ' database failure'});
        res.status(204).end();
    })
})

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

function connect_mongodb(res){
    async.waterfall([
        function(callback){
            MongoClient.connect(url , function(err , db){
                assert.equal(null , err);

                console.log('Connected correctly to sesrver');

                db.close();

                callback(null, 'connect mongodb');
            });
        }
    ],
    function(callback, message) {
        res.send(message);
        console.log('--------------------------');
    }
    
    );
}

function find_gps(res) {
    async.waterfall([
        function(callback){
            MongoClient.connect(url, function(err, db) {
                if(err) throw err;
                var dbo = db.db("mydb");

                // dbo.collection("GPS").find({nmae : "Long"}, function( err, result){
                //     if(err) throw err;
                //     console.log(result.value);
                //     db.close();
                //     callback(null , 'find........',result)
                // });
                dbo.collection("GPS" , function(err,collection) {
                    collection.find().toArray(function(err,result) {
                        console.log(result.values)
                        db.close()
                        callback(null , 'find........',result)
                    })
                })
            });
            
        }
        
    ],
    function(callback, message, result) {
        // res.send(message);
        res.send(result)
        console.log('--------------------------');
    }
    );
}