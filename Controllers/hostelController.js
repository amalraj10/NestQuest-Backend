//import modal
const hostels = require('../Model/hostelSchema');
const projects = require('../Model/hostelSchema')


exports.addhostel = async(req,res)=>{
    console.log('inside hostel add controller');
    const userId = req.payload
    console.log(userId);


    const hostelimage1 = req.files[0].filename
    console.log(hostelimage1);
    
    const hostelimage2 = req.files[1].filename
    console.log(hostelimage2);
    
    const hostelimage3 = req.files[2].filename
    console.log(hostelimage3);
    const{hostelName,dLmark,license,rate,occupancy,availableRoom, fc1,fc2,fc3,fc4,fc5,description} = req.body
 console.log(`${hostelName},${dLmark},${license},${rate},${occupancy},${availableRoom},${fc1},${fc2},${fc3},${fc4},${fc5},${description},${hostelimage1},${hostelimage2},${hostelimage3},${userId}`);

 try{
    const ExistingHostel = await hostels.findOne({license})
if(ExistingHostel){
    res.status(406).json('License Already Exist...')
}   
else{
    const newHostel = new hostels({
        hostelName,dLmark,license,rate,occupancy,availableRoom, fc1,fc2,fc3,fc4,fc5,description,hostelimage1,hostelimage2,hostelimage3,userId
    })
    await newHostel.save()
    res.status(200).json(newHostel)
}

 }catch(err){
    res.status(401).json(`Request failed due to ${err}`)
 }

}


//all hostel
exports.getallhostel = async(req,res)=>{
    const search = req.query.search
    console.log(search);
    const query = {
        dLmark:{  $regex:search, $options:'i'
}    }
try{
 const allHostel = await projects.find(query)
 res.status(200).json(allHostel)
}catch(err){
    res.status(401).json(`Request failed due to ${err}`)
}
}

//all hostel
exports.getallHostelnew = async(req,res)=>{
    
    try{
     const ownerHostel = await projects.find()
     res.status(200).json(ownerHostel)
    }catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }
    }

//owner hostel
exports.getownerHostel = async(req,res)=>{
    const userId = req.payload
    try{
     const ownerHostel = await projects.find({userId})
     res.status(200).json(ownerHostel)
    }catch(err){
        res.status(401).json(`Request failed due to ${err}`)
    }
    }


//edit project
exports.editOwnerHostel = async (req, res) => {
  const { id } = req.params;
  const userId = req.payload;
  const {
    hostelName,
    dLmark,
    license,
    rate,
    occupancy,
    availableRoom,
    fc1,
    fc2,
    fc3,
    fc4,
    fc5,
    description,
    
  } = req.body;

  let hostelImages = {};

  if (req.files) {
    const uploadedHostelImage1 = req.files.find(
      (file) => file.fieldname === 'hostelimage1'
    );
    const uploadedHostelImage2 = req.files.find(
      (file) => file.fieldname === 'hostelimage2'
    );
    const uploadedHostelImage3 = req.files.find(
      (file) => file.fieldname === 'hostelimage3'
    );

    if (uploadedHostelImage1) {
      hostelImages.hostelimage1 = uploadedHostelImage1.filename;
    }
    if (uploadedHostelImage2) {
      hostelImages.hostelimage2 = uploadedHostelImage2.filename;
    }
    if (uploadedHostelImage3) {
      hostelImages.hostelimage3 = uploadedHostelImage3.filename;
    }
  }

  try {
    const updateHostel = await hostels.findByIdAndUpdate(
      { _id: id },
      {
        hostelName,
        dLmark,
        license,
        rate,
        occupancy,
        availableRoom,
        fc1,
        fc2,
        fc3,
        fc4,
        fc5,
        description,
       
        userId,
        ...hostelImages,
      },
      { new: true }
    );

    res.status(200).json(updateHostel);
  } catch (err) {
    res.status(401).json(err);
  }
};


//delete project
exports.deleteHostel = async(req,res)=>{
 
    const {id} = req.params


    try{
        const  removeHostel = await hostels.findByIdAndDelete({_id:id})
        res.status(200).json(removeHostel)

    }catch(err){
        res.status(401).json(err)
    }

}


