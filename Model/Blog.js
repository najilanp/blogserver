const mongoose=require('mongoose')


const blogSChema =new mongoose.Schema({
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
image:{
    type:String,
    required:true
},
user:{
    type:mongoose.Types.ObjectId,
    ref:"users",
    required:true
},

})
const blogs = mongoose.model('blogs',blogSChema)
module.exports=blogs
