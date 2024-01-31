const catchAsync = require('@utils/catchAsync');
const userModel = require('@model/userModel');
const multer = require('multer');

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

exports.updateMongoDbData = catchAsync(async (req, res, next) => {
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
exports.fetchPreviousUserImage = catchAsync( async (req, res, next) => {
   const data = await fetchImageData(req.params.id);
   if(data.imageName === "no Image Uploaded"){
      return next(new AppError('Please upload image first! Then send request to update ', 400));
   }else {
      req.imagePublicId = data.imageData.publicId;
      console.log(req.body)
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
   let id;
   if(req.params.id) {
      id = req.params.id;
   }else{
      return next(new AppError('ID is not found in the Parameter!', 400))
   }

   const processedData = processDataForUpdate(req); 
   const data = await userModel.findByIdAndUpdate(id, {imageData: processedData});
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