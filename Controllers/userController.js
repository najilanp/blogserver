//import user model
const users=require('../Model/userSchema')

//get all users
 exports.getAllUser=async(req,res)=>{
    // let user;
    try{
     const allusers=await users.find();
     if(allusers){
        return res.status(200).json({allusers})
    }else{
        return res.status(406).json({message:'no user found'})
    }
    }catch(err){
        res.status(401).json(`Èrror!!!Transaction failed:${err}`)

    }
    
}

//signup
exports.signup = async(req,res)=>{
    console.log("inside signup function");
    const {name,email,password}=req.body

    try{
        //check already existing user findone()
        const existingUser=await users.findOne({email})
        if(existingUser){
            res.status(406).json("user already exist")
        }else{
            //register user

            const newUser = new users({
             name,
             email,
             password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    }catch(err){
        res.status(401).json(`Èrror!!!Transaction failed:${err}`)
    }
}

exports.login=async(req,res)=>{
    console.log("inside login function");
    const {email,password}=req.body
    try{
        const existingUser=await users.findOne({email,password})
        if(existingUser){
            res.status(200).json({
                existingUser
             })
        }else{
            res.status(404).json("incorrect email/password")
        }


    }catch(err){
        res.status(401).json(`Èrror!!!Transaction failed:${err}`)
    }


}