const mongoose=require('mongoose')

// const Schema=mongoose.Schema;

const userSChema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    blogs:[{
        type:mongoose.Types.ObjectId,
        ref:"blogs",
        required:true
    }]

})

const users = mongoose.model('users',userSChema)
module.exports=users