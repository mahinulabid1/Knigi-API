const shopModel = require('@model/shopModel');
const catchAsync = require('@utils/catchAsync');
const AppError = require('@utils/appError');
const multer = require('multer')
const upload = multer({
   dest: 'upload/'
})

//can't update image in this version
// exports.multerUpload = upload.none();

exports.parseBody = catchAsync(async(req, res, next) => {
   const parsedData = {
      productTitle: req.body.productTitle,

      productPrice: {
         regularPrice: req.body.regularPrice,
         discountedPrice: req.body.discountedPrice,
         regularPriceBeforeDiscount: req.body.regularPriceBeforeDiscount
      },

      productAboutInfo: req.body.productAboutInfo,
      productSpecs: req.body.productSpecs,
   }



   req.body = parsedData;
   next();
})

exports.update = catchAsync( async (req, res, next) => {
   let id;
   req.params.idValue === undefined ? next(new AppError('id is undefined!', 400)) : id = req.params.idValue;
   const data = req.body;
   await shopModel.findByIdAndUpdate(id, data );  
   res.status(200).json({
      status: 'Update Successful!',
      data: data
   })
})
