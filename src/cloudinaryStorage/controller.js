const cloudinary = require('./storage.config');
const catchAsync = require('@utils/catchAsync');
const generateUniqueKey = require('@utils/generateUniqueKey')
const fs = require('fs');
const sharp = require('sharp')


const performCloudUpload = async (imagePath) => {
   // Use the uploaded file's name as the asset's public ID and 
   // allow overwriting the asset with new versions
   const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
   };

   // Upload the image
   const result = await cloudinary.uploader.upload(imagePath, options);
   return result;
};


const deleteImage = async (publicId) => {
   cloudinary.uploader.destroy(publicId).then(
      () => {
         console.log('Cloudinary Update: file successfully deleted!');
      }
   );
}


const compressImageFile = async (fileBuffer) => {
   const uniqueKey = generateUniqueKey();
   // const filePath = `${__dirname}/../../upload/${req.file.filename}`;

   await sharp(fileBuffer)
      .jpeg({ quality: 60 })
      .toFile(`${__dirname}/../../upload/${uniqueKey}.jpg`)
      .then(() => {
         console.log(`Compressed file successfully!`);
      });

   return {
      imageName: `${uniqueKey}.jpg`,
      path: `${__dirname}/../../upload/${uniqueKey}.jpg`
   }
}


const deleteCompressedImageFile = (imageName) => {
   const filePath = `${__dirname}/../../upload/${imageName}`;
   fs.unlink(filePath,
      (err => {
         if (err) console.log(err);
         else {
            console.log("\nDeleted file");
         }
      })
   );
}

const uploadAndDeleteTempFile = async (fileBuffer) => {
   const compressedFileInfo = await compressImageFile(fileBuffer);
   const uplaodedFileInfo = await performCloudUpload(compressedFileInfo.path);
   deleteCompressedImageFile(compressedFileInfo.imageName);
   return uplaodedFileInfo;
}

// this is a middleware
exports.uploadFile = catchAsync(async (req, res, next) => {
   const uploadedFileData = await uploadAndDeleteTempFile(req.file.buffer);
   req.body.uploadedImageInformaiton = uploadedFileData;
   next();
})

// middleware
exports.deleteOldUserImage = catchAsync(async (req, res, next) => {
   const publicId = req.imagePublicId // processed by middleware
   await deleteImage(publicId);
   next();
})


exports.uploadMultipleFile = catchAsync(async (req, res, next) => {
   const arrayOfFiles = req.files;
   req.uploadedFilesArray = [];
   for(let i = 0; i < arrayOfFiles.length; i++ ) {
      let buffer = arrayOfFiles[i].buffer;
      let uploadedFileData = await uploadAndDeleteTempFile(buffer);
      let data = {
         imageName : `${uploadedFileData.public_id}.jpg`,
         publicId : uploadedFileData.public_id,
         imageLink : uploadedFileData.secure_url
      }
      req.uploadedFilesArray.push(data);
      console.log(req.uploadedFilesArray);
   }
   next();
})