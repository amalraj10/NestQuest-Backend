const bookings = require('../Model/bookingSchema')

//import jwt 
const jwt = require('jsonwebtoken')


console.log('inside the controller - register function');

//hostel booking
exports.hostelbooking = async(req,res)=>{

   
   

    const{uname,uemail,unumber,uaadhar,udate,usharings,umsg,hostelID} = req.body
     console.log(!uname || !uemail || !unumber || !uaadhar || !udate || !usharings || !umsg ||!hostelID);

     try{

        const newBooking = new bookings({

            uname,uemail,unumber,uaadhar,udate,usharings,umsg,hostelID

        })
        await newBooking.save()
        res.status(200).json(newBooking)

     }catch(err){
        res.status(401).json(`Request failed due to ${err}`)

     }


}

//getting booking deatils
exports.getBookedDetails = async(req,res)=>{
   
  const id = req.params.id
  console.log(id);
   try{
    const bookedDetails = await bookings.find({hostelID:id})
    res.status(200).json(bookedDetails)
   }catch(err){
       res.status(401).json(`Request failed due to ${err}`)
   }
   }


//deleting user details
exports.deleteUserDT = async(req,res)=>{
    const {id} = req.params
 
    try{
        const removeUserDT = await bookings.findByIdAndDelete({_id:id})
        res.status(200).json(removeUserDT)
    }
    catch(err){
        res.status(401).json(err)
    }


}