//import blog model

const blogs=require('../Model/Blog')
const users = require('../Model/userSchema')
const mongoose=require('mongoose')


exports.getAllBlogs=async(req,res,next)=>{

try{
    const allblogs=await blogs.find()
    if(allblogs){
        return res.status(200).json({allblogs})
    }else{
        return res.status(406).json({message:'no blogs found'})
    }

}catch(err){
        res.status(401).json(`Èrror!!!Transaction failed:${err}`)

}
}


exports.addBlog=async(req,res,next)=>{
    const{title,description,image,user}=req.body
let existingUser
try{
    existingUser=await users.findById(user)
} catch(err){
    res.status(401).json(`Èrror!!!Transaction failed:${err}`)

}
    if(!existingUser){
        return res.status(400).json({message:'unable to find user by this id'})
    }
        const blog=new blogs({
            title,description,image,user
        })
    try{
        const session = await mongoose.startSession()
        session.startTransaction()
       await blog.save({session})
       existingUser.blogs.push(blog)
       await existingUser.save({session})
       await session.commitTransaction()
    }catch(err){
        return console.log(err);
        return res.status(500).json({message:err})
    }
    return res.status(200).json({blog})
}

exports.updateBlog=async(req,res,next)=>{
    const{title,description}=req.body
    const blogId=req.params.id
    try{
       const blog=await blogs.findByIdAndUpdate(blogId,{
            title,description
        })
        if(blog){
            return res.status(200).json({blog})
 
        }else{
            return res.status(500).json({message:'unable to update the blog'})

        }

    }catch(err){
       return res.status(401).json(`Èrror!!!Transaction failed:${err}`)
 
    }
}

exports.getById=async(req,res,next)=>{
    const id = req.params.id
    try{
        const blog=await blogs.findById(id)
        if(blog){
            return res.status(200).json({blog})  
        }else{
            return res.status(404).json({message:'no blog found'})
        }
    }catch(err){
        return res.status(401).json(`Èrror!!!Transaction failed:${err}`)

    }
}

exports.deleteBlog=async(req,res,next)=>{
    const id = req.params.id
    try{
        const blog=await blogs.findByIdAndDelete(id).populate('user')
        await blog.user.blogs.pull(blog)
        await blog.user.save()
        if(blog){
            return res.status(200).json({message:'successfully deleted'})  
 
        }else{
            return res.status(500).json({message:'unable to delete'})

        }
    }catch(err){
        return res.status(401).json(`Èrror!!!Transaction failed:${err}`)
    }

}


exports.getByUserId=async(req,res,next)=>{
    const userId=req.params.id
    try{
        const userBlogs=await users.findById(userId).populate('blogs')
        if(userBlogs){
            return res.status(200).json({blogs:userBlogs})  

        }else{
            return res.status(404).json({message:'no blog found'})
 
        }

    }catch(err){
        return res.status(401).json(`Èrror!!!Transaction failed:${err}`)
    }
}