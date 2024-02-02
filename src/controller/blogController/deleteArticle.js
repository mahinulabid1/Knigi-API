const BlogModel = require('../../model/blogModel');
const catchAsync = require('@utils/catchAsync');
const AppError = require('@utils/appError')


exports.articleValidation = catchAsync(async (req, res, next) =>{
   const id = req.params.idValue;
   const result = await BlogModel.findOne({_id: id});
   if(result === null || !result) {
      return next(new AppError('No article found with this ID🙄'), 404);
   }
   req.articleData = result;
   next();
})

exports.fetchImagePublicId = catchAsync(async (req, res, next) => {
   const articleImageCollection = req.articleData.articleImageCollection;
   let imagePublicIdArr = [];
   for(let i = 0; i < articleImageCollection.length; i++){
      const publicId = articleImageCollection[i].publicId;
      imagePublicIdArr.push(publicId);
   }
   req.imageIdArr = imagePublicIdArr;
   next();
})

exports.deleteArticle = catchAsync(async (req, res, next) =>{
   const id = req.params.idValue;
   await BlogModel.findOneAndDelete({_id: id});
   res.status(200).json({
      status: "successful",
      message: "Article deleted successfully!"
   })
})