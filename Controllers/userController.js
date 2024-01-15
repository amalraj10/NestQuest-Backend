//logic to resolve request
//import modal
const users = require('../Model/userSchema')

//import jwt 
const jwt = require('jsonwebtoken')


console.log('inside the controller - register function');


//register request
exports.register = async(req,res)=>{

const {username,email,password}=req.body


try{const existUser = await users.findOne({email})

if(existUser){
    res.status(406).json('Account already exist.....please login')
}
else{
    //need to register
  //1.create object for modal
  const newUser = new users({
    username,
    email,
    password,
    mobile:"",
    aadhar:"",
    date:"",
    sharings:"",
    message:""


  })
  //add to mongodb - use save method in mongoose
  await newUser.save()
    //response
    return res.status(200).json(newUser)



  


    //response
res.status(200).json("REGISTRATION REQUEST RECIEVED")
}
}
catch(err){
    res.status(401).json(`Register request Failed due to ${err}`)
}



}

//login request
exports.login = async(req,res)=>{
  const {email,password} = req.body
  
  try{
  const existingUser = await users.findOne({email,password})
  console.log(existingUser);
  if(existingUser){
    //jwt token
    const token = jwt.sign({userId:existingUser._id},"superstar")

    res.status(200).json({existingUser,token})
  }
  else{
    res.status(404).json('invalid Email Id or Password')
  }
}catch(err){
  res.status(401).json(`login request failed  due to ${err}`);
}
}