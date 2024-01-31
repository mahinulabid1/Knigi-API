const multer = require('multer');
const fs = require('fs');
const UserModel = require('@model/userModel');
const catchAsync = require('@utils/catchAsync');
const AppError = require('@utils/appError');
const cloudinaryController = require('../../cloudinaryStorage//controller');

// const upload = multer({
//    dest: 'upload/',
//    limits: { fileSize: 1000 * 2000 }, // 2MB
// });
const storage = multer.memoryStorage()
const upload = multer({ 
   storage: storage ,
   limits: { fileSize: 1000 * 2000 }, // 2MB
})


exports.multerUpload = upload.single('userImage');

// create new record main
exports.create = catchAsync( async ( req, res, next ) => {
   // how user will send the data
   // if the form doesn't have enctype then it will send x-www-form-urlencoded
   // x-www-form-urlencoded has key-value pair
   req.body.gender = req.body.gender.toLowerCase();
   const data = new UserModel(req.body);
   await data.save();
   res.status(200).json({
      status: 200,
      message: 'Data uploaded successful!',
      data : data
   })
})

// unique user validation while creating new Record
exports.validateUsername = catchAsync(async( req, res, next ) => {
   if(req.params.username) {
      const username = req.params.username;
      const result = await UserModel.find({'username': username}, 'username');
      res.send(result);
   }
   else if(req.body.username) {
      const username = req.body.username;
      const result = await UserModel.find({'username': username}, 'username');
      if(result.length > 0 ) {
         next(new AppError('Username already exist!', 409));
      }
      else {
         next();
      }
   }
})


// upload picture seperately
exports.uploadPicture = catchAsync( async( req, res, next ) => {
   let id;
   if(req.params.id) {
      id = req.params.id 
   } else {
      return next(new AppError('ID is not defined', 400)) 
   }

   let imageData = req.body.uploadedImageInformaiton; // handled by multer uploader
   console.log(imageData)
   const processedData = {
      imageName: `${imageData.public_id}.jpg`,
      imageLink: imageData.secure_url,
      publicId: imageData.public_id
   }
   const result = await UserModel.findByIdAndUpdate(id, { imageData:processedData })
   console.log(result)
   res.status(200).json({
      status: 200,
      message: 'update Successful!',
      data: result
   })
})








///// DEV MODE

exports.testUpload = catchAsync( async (req, res, next) => { 
   const result = await cloudinaryController.uploadImage(`${__dirname}/../../../upload/${req.file.filename}`)
   res.send(result);
})


exports.deleteImage = catchAsync(async (req, res, next) => {
   const result = await cloudinaryController.deleteImage('f6152c9b14c95c77b6d9cd74d1cfbc65');
   res.json(result);
})