//import blog model

const blogs=require('../Model/Blog')

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
    const blog=new blogs({
        title,description,image,user
    })
    try{
       await blog.save()
    }catch(err){
        return console.log(err);
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