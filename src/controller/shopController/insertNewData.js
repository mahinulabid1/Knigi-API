/*
- insert the parsed data in mongoDB
*/
const catchAsync = require('@utils/catchAsync');
const { s3FileDelete } = require('@awsS3/s3.deleteController.js');
const ShopModel = require('@model/shopModel');
const multer = require('multer');


const upload = multer({ dest: 'upload/', limits: { fileSize: (1000 * 2000) } }); // 2MB

exports.uploadImage = upload.fields(
   {
      name: 'bookPicture',
      maxCount: 1
   },
   {
      name: 'thumbnail',
      maxCount: 1
   }
)

exports.uploadAWS = catchAsync(async (req, res, next) => {

})

exports.parseBody = (req, res, next) => {
   const parsedData = {
      productTitle: req.body.productTitle,

      productPrice: {
         regularPrice: req.body.regularPrice,
         discountedPrice: req.body.discountedPrice,
         regularPriceBeforeDiscount: req.body.regularPriceBeforeDiscount
      },

      productAboutInfo: req.body.productAboutInfo,
      productSpecs: req.body.productSpecs,

      imageCollection: {

         productImage: {
            url: `${cloudfront}/testUpload/shopItem/${req.body.bookPicture}`,
            imageName: req.body.bookPicture
         },

         thumbnail: {
            url: `${cloudfront}/testUpload/shopItem/${req.body.thumbnail}`,
            imageName: req.body.thumbnail
         }

      }
   }

   req.body = parsedData;
   next();
}

const insertNewData = async (req, res, next) => {
   try {
      const data = req.body.knigi_parsedData;
      const finalData = new ShopModel(data);
      await finalData.save();
      return "Data Uploaded"
   } catch (err) {
      /*
      - if there is an error uploading database image then
      - delete the file that was uploaded
      */
      let imageCollection = req.body.knigi_parsedData.imageCollection;

      let filePathProcess1 = imageCollection.productImage.imageName;
      filePathProcess1 = `/testUpload/shopItem/${filePathProcess1}`;

      let filePathProcess2 = imageCollection.thumbnail.imageName
      filePathProcess2 = `/testUpload/shopItem/${filePathProcess2}`;

      s3FileDelete(filePathProcess1);
      s3FileDelete(filePathProcess2);

      throw new Error(err);
   }
}


module.exports = insertNewData;