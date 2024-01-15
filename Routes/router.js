//setup path to resolve request

//1.import express module
const express = require('express')

//import controller
const userController = require('../Controllers/userController')


//import hostel controller
const hostelController = require('../Controllers/hostelController')
//import ownercontroller
const ownerController = require('../Controllers/ownerController')

//import bookingControler
const bookingController = require('../Controllers/bookingController')



//import jwt middleware
const jwtMiddleware = require('../Middleware/jwtMiddleware')
//import multer
const multerConfig = require('../Middleware/multerMiddleware')

//2.create an object for Router class inside express module
const router = new express.Router()

//4.setup path to resolve request
//syntax - router - httprequest('path to resolve',()=>(how to resolve))
//a.userregister
router.post('/users/register',userController.register)

//b.userlogin
router.post('/user/login',userController.login)

//c.owner register
//a.userregister
router.post('/owner/register',ownerController.register)

//b.userlogin
router.post('/owner/login',ownerController.login)


//c.add hostel
router.post('/hostels/add', jwtMiddleware, multerConfig.any([
    { name: 'hostelimage1', maxCount: 1 },
    { name: 'hostelimage2', maxCount: 1 },
    { name: 'hostelimage3', maxCount: 1 },
  ]), hostelController.addhostel);

//d.all hostel search
router.get('/hostel/all-hostel',jwtMiddleware,hostelController.getallhostel)

//f.all hostel
router.get('/hostel/all-hostel-new',jwtMiddleware,hostelController.getallHostelnew)
//e.owner hostel
router.get('/owner/all-hostel',jwtMiddleware,hostelController.getownerHostel)
//f.edit hostel
router.put('/hostel/edit/:id',jwtMiddleware,multerConfig.any([
  { name: 'hostelimage1', maxCount: 1 },
  { name: 'hostelimage2', maxCount: 1 },
  { name: 'hostelimage3', maxCount: 1 },
]),hostelController.editOwnerHostel)


//deleteproject
router.delete('/hostel/remove/:id',jwtMiddleware,hostelController.deleteHostel)


//booking project
router.post('/user/booking',jwtMiddleware,bookingController.hostelbooking)

//getcbooked deatils
router.get('/owner/booked-details/:id',jwtMiddleware,bookingController.getBookedDetails)


//deletedetails
router.delete('/userdt/remove/:id',jwtMiddleware,bookingController.deleteUserDT)



//4.export router
module.exports = router
