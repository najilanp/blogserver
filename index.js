//to load .env file
require('dotenv').config()
//create express server
const express = require('express')
//import cors
const cors = require('cors')

//import router
const router = require('./Routes/routes')

//import db
require('./DB/connection')

//create express server
const blogServer=express()

//use cors
blogServer.use(cors())

//parse json data using server
blogServer.use(express.json())

//use router
blogServer.use(router)

//create port num
const PORT=4000 || process.env.PORT

//run server app
blogServer.listen(PORT,()=>{
    console.log(`blog project server started at port:${PORT}`);
})
//resolve request to localhost:4000
blogServer.get('/',(req,res)=>{
    res.send(`<h1>Blog project server started </h1>`)
})
