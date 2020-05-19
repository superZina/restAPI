const express = require('express');

const server = express();

const users = [
    {
        id:"dfdfdfdf",
        name:"dlwlsgk",
        email:"ddd@dfdfff"
    },
    {
        id:"dffffddddd",
        name:"ssssss",
        email:"ddd@dddfdfdfdfdfdf"
    }
]

server.get("/api/user",function(req,res){
    res.json(users);
})

server.listen(3000 , function(){
    console.log("Server is running");
})