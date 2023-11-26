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
    }

})

const users = mongoose.model('users',userSChema)
module.exports=users