//logic to resolve request
//import modal
const owners = require('../Model/OwnerSchema')

//import jwt 
const jwt = require('jsonwebtoken')


console.log('inside the controller - register function');


//register request
exports.register = async(req,res)=>{

const {username,email,password}=req.body


try{const existOwner = await owners.findOne({email})

if(existOwner){
    res.status(406).json('Account already exist.....please login')
}
else{
    //need to register
  //1.create object for modal
  const newOwner = new owners({
    username,
    email,
    password,
    


  })
  //add to mongodb - use save method in mongoose
  await newOwner.save()
    //response
    return res.status(200).json(newOwner)

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
  const existingOwner = await owners.findOne({email,password})
  console.log(existingOwner);
  if(existingOwner){
    //jwt token
    const token = jwt.sign({userId:existingOwner._id},"superstar")

    res.status(200).json({existingOwner,token})
  }
  else{
    res.status(404).json('invalid Email Id or Password')
  }
}catch(err){
  res.status(401).json(`login request failed  due to ${err}`);
}
}