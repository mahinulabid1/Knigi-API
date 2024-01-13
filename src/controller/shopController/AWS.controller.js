const { mimeTypeCheck } = require('@additionalFunction/mimeTypeCheck.js');
const fs = require('fs');
const s3FileUpload = require('@awsS3/s3.uploadController.js');
const catchAsync = require('@utils/catchAsync');
const AppError = require('@utils/appError');

const upload = async (filename) => {
   picture = fs.readFileSync(`${__dirname}/../../../upload/${filename}`);
   return uploadBookPicture = await s3FileUpload(picture, "testUpload/shopItem"); 
   //returns uploaded filename
}

exports.uploadAWS = catchAsync(async (req, res, next) => {
   /*
   - uploads files to AWS S3
   - make changes to req.body with uploaded file's information
   - Validation : if Validation is failed then execute error.
   */
   const validation = mimeTypeCheck([req.files.bookPicture[0].mimetype, req.files.thumbnail[0].mimetype]);

   if ( validation ) {
      bookPicture = await upload(req.files.bookPicture[0].filename);
      thumbnail = await upload(req.files.thumbnail[0].filename);
      req.body.bookPicture = bookPicture;
      req.body.thumbnail = thumbnail;
      next();
   }

   else {
      next(new AppError('Invalid Image Format!', 400));
   }
})


