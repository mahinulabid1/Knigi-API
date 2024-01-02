const s3FileUpload = require('@awsS3/s3.uploadController.js');
const fs = require('fs');
const { mimeTypeCheck } = require('@additionalFunction/mimeTypeCheck.js');
const uploadUserImage = async ( req ) => {
   /*
   - uploads files to AWS S3
   - make changes to req.body with uploaded file's information
   - Validation : if Validation is failed then execute error.
   */
   try {
      const imageTypeValidation = mimeTypeCheck([req.files.profilePicture[0].mimetype]);
      if( imageTypeValidation === true ) {
         let userPicture = req.files.profilePicture[0].filename;
         userPicture = fs.readFileSync(`${__dirname}/../../../upload/${userPicture}`);
         const uploadedUserPicture = await s3FileUpload(userPicture, 'testUpload/user');
         req.body.userPicture = uploadedUserPicture;
      }
      else {
         throw new Error('Invalid Image format! Please upload a valid image file.')
      }
   }
   catch( err ) {
      throw new Error(err);
   }
}

module.exports = uploadUserImage;