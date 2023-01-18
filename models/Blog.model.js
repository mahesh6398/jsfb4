const mongoose = require("mongoose");

const Blog = mongoose.model("Blog",new mongoose.Schema({
    name:String,
    description:String,
    author:String
},{
    timestamps:true
}))

module.exports=Blog;