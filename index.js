const express = require('express');
const mongoose = require("mongoose");
const Blog = require('./models/Blog.model');
const app=express();
const cors =require('cors');
const port = 5000;
const client= "mongodb://localhost:27017/test1"

mongoose.connect(client).then(()=>{
    console.log("success!!")
}).catch(err=>{
    console.log(err);
})


app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Headers','X-Requested-With');
    next();
})
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/create-blog',(req,res)=>{
let data =req.body;
let blog =new Blog(data);
blog.save().then(()=>
{
    console.log(data,"is added successful");
    res.send({Message:"Added suucessfully"});
})
.catch(err=>
    {
        console.log(err);
        res.send(err);
    });
});


app.get ('/get-blogs',(req,res)=>
{
Blog.find({}).then((result)=>{
    console.log(result);
    res.send(result);
}).catch(err=>{
    console.log(err);
})
});


app.patch('/update-blog/:id',(req,res)=>{
    let id = req.params.id;
    let data = req.body;
    console.log(data);
    console.log(id);

    Blog.findByIdAndUpdate(id,{$set:data},{returnOriginal:false}).then(result=>{
        console.log(result);
        res.send({message:"success"})
    }).catch(err=>{
        console.log(err)
        res.send(err);
    })
})


app.delete('/delete-blog/:id',(req,res)=>{
    let id = req.params.id;
    Blog.findByIdAndDelete(id).then(result=>{
        console.log(result);
        res.send({message:"deleted"});
    }).catch(err=>{
        console.log(err);
        res.send(err);
    })
})

app.listen(port,()=>{
    console.log(`server started at ${port} port`)
    
});

