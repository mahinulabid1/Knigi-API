const { mimeTypeCheck } = require('@additionalFunction/mimeTypeCheck.js');
const fs = require('fs');
const s3FileUpload = require('@awsS3/s3.uploadController.js');
// error: if 
const uploadImage = async ( req ) => {
   /*
   - uploads files to AWS S3
   - make changes to req.body with uploaded file's information
   - Validation : if Validation is failed then execute error.
   */
   try{

      const uploadValid = mimeTypeCheck([req.files.bookPicture[0].mimetype, req.files.thumbnail[0].mimetype]);

      if (uploadValid === true) {
         let bookPicture = req.files.bookPicture[0].filename;
         bookPicture = fs.readFileSync(`${__dirname}/../../../upload/${bookPicture}`);
         const uploadBookPicture = await s3FileUpload(bookPicture, "testUpload/shopItem");
   
         let thumbnail = req.files.thumbnail[0].filename;
         thumbnail = fs.readFileSync(`${__dirname}/../../../upload/${thumbnail}`);
         const uplaodThumbnail = await s3FileUpload(bookPicture, "testUpload/shopItem");
   
         req.body.bookPicture = uploadBookPicture;
         req.body.thumbnail = uplaodThumbnail;
         
      } 
   
      else {
         throw new Error('Invalid image format! Please upload a valid image file')
      }

   }catch(err){
      throw new Error (err)
   }
}

module.exports = uploadImage;
