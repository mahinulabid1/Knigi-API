const catchAsync = require('@utils/catchAsync');
const userModel = require('@model/userModel');
const s3FileUpload = require('@awsS3/s3.uploadController.js');
const multer = require('multer');
const fs = require('fs');

const upload = multer({
   dest: 'upload/',
   limits: { fileSize: 1000 * 2000 }, // 2MB
});

exports.multerUpload = upload.single('userImage');
// this validation has no effect, have to setup a different error handler
// const IDValidation = (req, next) => {
//    let id;
//    if(req.params.id) {
//       id = req.params.id;
//       return id;
//    }else{
//       return next(new AppError('ID is not found in the Parameter!', 400))
//    }
// }

exports.updateData = catchAsync(async (req, res, next) => {
   let id;
   if(req.params.id) {
      console.log(req.params.id)
      id = req.params.id;
   }else{
      return next(new AppError('ID is not found in the Parameter!', 400))
   }

   const result = await userModel.findByIdAndUpdate(id, req.body); 
   res.status(200).json({
      status: 'success',
      message: "update complete!",
      data : result
   })
})


const fetchImageData = async (id) => {
   const data = await userModel.findById(id, 'imageData');
   return data;
}

// checks the user database if user already uploaded image or not
exports.dBImageValidation = catchAsync( async (req, res, next) => {
   const data = await fetchImageData(req.params.id);
   
   if(data.imageName === "no Image Uploaded"){
      return next(new AppError('Please upload image first! Then send request to update ', 400));
   }else {
      req.body.awsImageName = data.imageName;
      next();
   }
})

const readImageFile = (req) => {
   // read the image 
   // return the binary image file
   // const userImage =  ;
   const file = fs.readFileSync(`${__dirname}/../../../upload/${req.file.filename}`);
   return file;
}


exports.uploadImageToAWS = catchAsync(async ( req, res, next ) =>{
   const file = readImageFile(req);
   const operationStatus = await s3FileUpload(file, `testUpload/userImage/${req.body.awsImageName}`);
   console.log(operationStatus);
   res.status(200).json({
      status: 200,
      message: 'Upload Successful'
   })
})


exports.updateImage = catchAsync(async (req, res, next) => {
   let id;
   if(req.params.id) {
      console.log(req.params.id)
      id = req.params.id;
   }else{
      return next(new AppError('ID is not found in the Parameter!', 400))
   }

   console.log(id);
   // search the database record, see if image is already uploaded or not!
   // if image is not uploaded then say: upload image first then update it
   // if image name is already existed then, find the image name, upload image with the same name again
})