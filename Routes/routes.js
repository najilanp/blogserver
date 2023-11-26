//import express
const express = require('express')
//import usercontroller 
const userController=require('../Controllers/userController')
//import blogcontroller
const blogController=require('../Controllers/blogController')
//create router for express using Router()
const router = new express.Router()


//define different routes for server app
router.get('/user/alluser',userController.getAllUser)
router.post('/signup',userController.signup)
router.post('/login',userController.login)

router.get("/blog/allblog",blogController.getAllBlogs)
router.post('/blog/add',blogController.addBlog)
router.put('/blog/update/:id',blogController.updateBlog)
router.get('/blog/allblog/:id',blogController.getById)


//export router
module.exports=router