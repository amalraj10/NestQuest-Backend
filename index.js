//1.import dotenv
require('dotenv').config()

//2.import express
const express = require('express')

//3.import cors
const cors = require('cors')

//import router
const router = require('./Routes/router')

//import connection.js file
require('./DB/connections')

//4.create server

const nqServer = express()

//5.use of cors in server
nqServer.use(cors())



//6.Returns a middleware that only parses json- javascript object
nqServer.use(express.json())

//use of router
nqServer.use(router)


//server use uploads folder
//first arg - the way in which other application should use this folder
//sec arg - export that folder - express static
nqServer.use('/uploads',express.static('./uploads'))

//7.customize port
const PORT = 4000 || process.env

//to run the server
nqServer.listen(PORT,()=>{
    console.log(`SERVER RUNNING SUCCESSFULLY AT PORT NUMBER ${PORT}`);
})

nqServer.get('/',(req,res)=>
res.send(`<h1>NestQuest Server Running successfully and ready to accept from clients</h1>`))