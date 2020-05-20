const express = require('express');
const bodyparser = require('body-parser')

const server = express();
server.use(bodyparser.json());
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
});
server.get("/api/user/:id",(req,res) => { //:id ㄱㅏ id를 파라미터로 받는다는뜻
    const user = users.find((u)=>{
        return u.id === req.params.id;
    });
    if(user){
        res.json(user);
    }else{
        res.status(404).json({errorMessage: "User not found"});
    }
});
server.post("/api/user",function(req,res){
    console.log(req.body);
    users.push(req.body);
    res.json(users);
})
server.listen(3000 , function(){
    console.log("Server is running");
})