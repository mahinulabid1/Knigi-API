/*
- insert the parsed data in mongoDB
*/
const catchAsync = require('@utils/catchAsync');
const { s3FileDelete } = require('@awsS3/s3.deleteController.js');
const ShopModel = require('@model/shopModel');
const multer = require('multer');
const AppError = require('@utils/appError');
const dotenv = require('dotenv')
dotenv.config({ path: '@dotenv' });

// multer config
const storage = multer.memoryStorage()
const upload = multer({
   storage: storage,
   limits: { fileSize: 1000 * 2000 }, // 2MB
})


exports.multerUpload = upload.fields([
   { name: 'bookPicture', maxCount: 1 },
   { name: 'thumbnail', maxCount: 1 },
]);

exports.parseBody = catchAsync(async (req, res, next) => {
   const parsedData = {
      productTitle: req.body.productTitle,

      productPrice: {
         regularPrice: req.body.regularPrice,
         discountedPrice: req.body.discountedPrice,
         regularPriceBeforeDiscount: req.body.regularPriceBeforeDiscount
      },

      productAboutInfo: req.body.productAboutInfo,
      productSpecs: req.body.productSpecs,

      imageCollection: req.uploadedFilesInfo
   }

   req.body = parsedData;
   next();
})

exports.uploadDataToMongoDb = catchAsync(async (req, res, next) => {
   const data = req.body;
   const finalData = new ShopModel(data);
   await finalData.save();
   res.status(200).json({
      status: 'success!',
      message: 'Data upload successful!',
      data: finalData
   })
})



exports.test = catchAsync(async (req, res, next) => {
   console.log(req.files.bookPicture[0].buffer);
   res.send('done')
})