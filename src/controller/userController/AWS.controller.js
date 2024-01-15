const { mimeTypeCheck } = require('@additionalFunction/mimeTypeCheck.js');
const fs = require('fs');
const s3FileUpload = require('@awsS3/s3.uploadController.js');
const catchAsync = require('@utils/catchAsync');
const AppError = require('@utils/appError');
const dotenv = require('dotenv');

dotenv.config({path:"@dotenv"});
const cloudfront = process.env.CLOUDFRONT_URL;

const upload = async (filename) => {
   picture = fs.readFileSync(`${__dirname}/../../../upload/${filename}`);
   return uploadBookPicture = await s3FileUpload(picture, "testUpload/userImage");
   //returns uploaded filename
}

exports.uploadAWS = catchAsync(async (req, res, next) => {
   /*
   - uploads files to AWS S3
   - make changes to req.body with uploaded file's information
   - Validation : if Validation is failed then execute error.
   */
   const validation = mimeTypeCheck([req.file.mimetype]);

   if ( validation ) {
      userImage = await upload(req.file.filename);
      const imageData = {
         imageName: userImage,
         awsImagePath: "testUpload/userImage",
         imageLink: `${cloudfront}/testUpload/userImage/${userImage}` 
      }
      req.body.imageData = imageData;
      next();
   }

   else {
      next(new AppError('Invalid Image Format!', 400));
   }
})


