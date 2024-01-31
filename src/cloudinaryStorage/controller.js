const cloudinary = require('./storage.config');
const catchAsync = require('@utils/catchAsync');
const generateUniqueKey = require('@utils/generateUniqueKey')
const fs = require('fs');
const sharp = require('sharp')
const multer = require('multer');




const cloudUpload = async (imagePath) => {
   // Use the uploaded file's name as the asset's public ID and 
   // allow overwriting the asset with new versions
   const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
   };

   // Upload the image
   const result = await cloudinary.uploader.upload(imagePath, options);
   console.log(result);
   // return result.public_id;
   return result;
};


exports.deleteImage = (publicId) => {
   cloudinary.uploader.destroy(publicId).then(
      () => {
         console.log('file successfully deleted');
      }
   );
}


const compressImageFile = async (req) => {
   const uniqueKey = generateUniqueKey();
   const filePath = `${__dirname}/../../upload/${req.file.filename}`;

   await sharp(filePath)
      .jpeg({ quality: 60 })
      .toFile(`${__dirname}/../../upload/${uniqueKey}.jpg`)
      .then(() => {
         console.log(`Compressed ${req.file.filename} successfully`);
      });

   return {
      imageName: `${uniqueKey}.jpg`,
      path: `${__dirname}/../../upload/${uniqueKey}.jpg`
   }
}

const deleteMulterTempUpload = (req) => {
   const filePath = `${__dirname}/../../upload/${req.file.filename}`;
   fs.unlinkSync(filePath);
}

const deleteCompressedImageFile = (imageName) => {
   const filePath = `${__dirname}/../../upload/${imageName}`;
   fs.unlinkSync(filePath);
}


// this is a middleware
exports.uploadFile = catchAsync(async (req, res, next) => {
   const compressedFileInfo = await compressImageFile(req);
   // deleteMulterTempUpload(req);
   const uplaodedFileInfo = await cloudUpload(compressedFileInfo.path);
   // deleteCompressedImageFile(compressedFileInfo.imageName);
   req.body.uploadedImageInformaiton = uplaodedFileInfo;
   next();
})