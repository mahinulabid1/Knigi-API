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


const cloudfront = process.env.CLOUDFRONT_URL;

// const upload = multer({ dest: 'upload/', limits: { fileSize: (1000 * 2000) } }); // 2MB

const upload = multer({
   dest: 'upload/',
   limits: { fileSize: 1000 * 2000 }, // 2MB
});

exports.multerUpload = upload.fields([
   { name: 'bookPicture', maxCount: 1 },
   { name: 'thumbnail', maxCount: 1 },
]);

exports.parseBody = catchAsync(
   async (req, res, next) => {
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
)

exports.insertNewData = async (req, res, next) => {
   try {
      const data = req.body;
      const finalData = new ShopModel(data);
      await finalData.save();
      res.status(200).send('Data Uploaded!')
   } catch (err) {
      /*
      - if there is an error uploading database image then
      - delete the file that was uploaded
      */
      let imageCollection = req.body.imageCollection;

      let filePathProcess1 = imageCollection.productImage.imageName;
      filePathProcess1 = `/testUpload/shopItem/${filePathProcess1}`;

      let filePathProcess2 = imageCollection.thumbnail.imageName
      filePathProcess2 = `/testUpload/shopItem/${filePathProcess2}`;

      s3FileDelete(filePathProcess1);
      s3FileDelete(filePathProcess2);

      next(err);
   }
}

