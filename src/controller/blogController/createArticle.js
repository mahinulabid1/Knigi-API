const catchAsync = require('@utils/catchAsync');
const multer = require('multer');
const sharp =require('sharp');
const UserModel = require('@model/userModel');
const BlogModel = require('../../model/blogModel');
const timeData = require('@lib/createFormattedCurrentTime')

// multer config
const storage = multer.memoryStorage()
const upload = multer({ 
   storage: storage ,
   limits: { fileSize: 1000 * 2000 }, // 2MB
})

exports.multerUpload = upload.array('articleImageCollection', 8);

exports.getUserDataFromDb = catchAsync(async (req, res, next) => {
   const data = await UserModel.findOne({username: req.body.username}, 'username firstName lastName');
   req.fetchUserData = data;
   next();
})

exports.processDateAndAuthorInfo = catchAsync(async (req, res, next) => {
   const userData = req.fetchUserData;
   let date = new Date();
   req.body.author = `${userData.firstName} ${userData.lastName}`;

   req.body.articlePublishedDate = timeData.absgetFormattedDateTimeWithGMT();
   next();
})

exports.debugMulterUpload = catchAsync(async(req, res, next) => {
   console.log(req.files);
   next();
})

const finalizeDataForUpload = (req) =>{
   req.body.articleImageCollection = req.uploadedFilesArray;
   const data = new BlogModel(req.body);
   return data;
}

exports.createNewArticle = catchAsync(async (req, res, next) => {
   const finalData = finalizeDataForUpload(req);
   await finalData.save(); 
   res.status(200).json({
      status: 200,
      message: "upload successful!",
      data: finalData
   })
})