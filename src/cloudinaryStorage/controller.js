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


exports.deleteImage = async (publicId) => {
   if(!publicId) {
      console.log('Cannot delete image File of Public_id: undefined');
      return;
   }
   cloudinary.uploader.destroy(publicId).then(
      () => {
         console.log('Cloudinary Update: file successfully deleted!');
      }
   );
}


const compressImageFile = async (fileBuffer) => {
   const uniqueKey = generateUniqueKey();

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
            console.log("\nDeleting Compressed File from /upload");
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

exports.uploadRollBackOnError = () => {

}

// this is a middleware
exports.uploadFile = catchAsync(async (req, res, next) => {
   
   const isUploadPerformed = req.isFileUploaded.status; // true or false
   const uploadedFileData = await uploadAndDeleteTempFile(req.file.buffer);
   req.body.uploadedImageInformaiton = uploadedFileData;
   req.isFileUploaded.status = true;
   req.isFileUploaded.publicIdArr.push(uploadedFileData.public_id);
   next();
})

// middleware
exports.deleteOldUserImage = catchAsync(async (req, res, next) => {
   const publicId = req.imagePublicId // processed by middleware
   await exports.deleteImage(publicId);
   next();
})

exports.deleteMultipleImage = catchAsync(async (req, res, next) => {
   if(!req.imageIdArr) return next(); // for older data: if you don't find image public id go to next
   const imagePublicIdArray = req.imageIdArr;
   
   // receives array just containing publicId in each index
   for (let i = 0; i < imagePublicIdArray.length; i++) {
      await exports.deleteImage(imagePublicIdArray[i]);
      if(imagePublicIdArray[i]) console.log(`Deleted image with Public id : ${imagePublicIdArray[i]}`); // if :dont console if image id is undefined
   }
   next();
})


exports.uploadMultipleFile = catchAsync(async (req, res, next) => {
   const arrayOfFiles = req.files;
   req.uploadedFilesArray = [];
   for (let i = 0; i < arrayOfFiles.length; i++) {
      let buffer = arrayOfFiles[i].buffer;
      let uploadedFileData = await uploadAndDeleteTempFile(buffer);
      let data = {
         imageName: `${uploadedFileData.public_id}.jpg`,
         publicId: uploadedFileData.public_id,
         imageLink: uploadedFileData.secure_url
      }
      req.uploadedFilesArray.push(data);
      req.isFileUploaded.publicIdArr.push(uploadedFileData.public_id);
   }
   req.isFileUploaded.status = true;
   
   next();
})

// better to approach simple, though its not reuseable
exports.uploadShopItemFiles = catchAsync(async (req, res, next) => {
   const bookPictureBuffer = req.files.bookPicture[0].buffer;
   const thumbnailBuffer = req.files.thumbnail[0].buffer;

   if(!bookPictureBuffer  && !thumbnailBuffer) {
      return next();
   }

   const uploadedBookPictureInfo = await uploadAndDeleteTempFile(bookPictureBuffer);
   const uploadedThumbnailInfo = await uploadAndDeleteTempFile(thumbnailBuffer);

   let data = {
      productImage: {
         url: uploadedBookPictureInfo.secure_url,
         imageName: `${uploadedBookPictureInfo.public_id}.jpg`,
         publicId: uploadedBookPictureInfo.public_id
      },
      thumbnail: {
         url: uploadedThumbnailInfo.secure_url,
         imageName: `${uploadedThumbnailInfo.public_id}.jpg`,
         publicId: uploadedThumbnailInfo.public_id
      }
   }
   req.uploadedFilesInfo = data;

   next();
})