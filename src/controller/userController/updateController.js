const catchAsync = require('@utils/catchAsync');
const userModel = require('@model/userModel');
const AppError = require('@utils/appError')
const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({ 
   storage: storage ,
   limits: { fileSize: 1000 * 2000 }, // 2MB
})

exports.multerUpload = upload.single('userImage');



// ========================
// MONGODB user data update
exports.updateMongoDbData = catchAsync(async (req, res, next) => {
   await userModel.findOneAndUpdate({username: req.tokenInfo}, req.body); 
   res.status(200).json({
      status: 'success',
      message: "update complete!",
      data : req.body
   })
})


const fetchImageData = async (tokenInfo) => {
   const data = await userModel.findOne({username: tokenInfo}, 'imageData');
   return data;
}

// checks the user database if user already uploaded image or not
exports.fetchPreviousUserImage = catchAsync( async (req, res, next) => {
   const data = await fetchImageData(req.tokenInfo);

   if(data.imageName === "no Image Uploaded"){
      return next(new AppError('Please upload image first! Then send request to update ', 400));
   } 
   else {
      req.imagePublicId = data.imageData.publicId;
      next();
   }
})


const processDataForUpdate = (req) => {
   let imageData = req.body.uploadedImageInformaiton; // handled by multer uploader

   const processedData = {
      imageName: `${imageData.original_filename}.jpg`,
      imageLink: imageData.secure_url,
      publicId: imageData.public_id
   }

   return processedData;
}

exports.updateImageDataInMongoDb = catchAsync(async (req, res, next) => {
   const processedData = processDataForUpdate(req); 
   await userModel.findOneAndUpdate({username: req.tokenInfo}, {imageData: processedData});
   res.status(200).json({
      status: 200,
      message: 'update complete!',
      data: processedData
   })
})





exports.test = catchAsync(async (req, res, next) => {
   console.log(req.file);
   res.send(req.file);
})