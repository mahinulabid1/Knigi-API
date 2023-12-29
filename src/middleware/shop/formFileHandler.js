const { app } = require('@index');
const { mimeTypeCheck } = require('@additionalFunction/mimeTypeCheck.js');
const fs = require('fs');
const s3FileUpload = require('@awsS3/s3.uploadController.js');

app.post("/api/v1/newShopItem", async (req, res, next) => {
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

         next();
      }
   
      else {
         res.writeHead(400, {
            'error': 'the file was to image. Please upload image file.'
         });
   
         res.end("Error! Invalid Image format.");
         // res.send() is giving me an error due to using res.writeHead()
         // Error: connot set headers after the response is set, that's why used res.end()
      }

   }catch(err){
      res.writeHead(400, {
         'Error' : 'There was an error while Uploading file.',
         'ErrorDetails' : err 
      })
      res.end(err);
   }

})