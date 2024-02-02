const BlogModel = require('../../model/blogModel');
const catchAsync = require('@utils/catchAsync');
const AppError = require('@utils/appError')


exports.updateMongodbData = catchAsync(async(req, res, next) =>{
   const articleId = req.params.idValue;
   const data = req.body;
   await BlogModel.findByIdAndUpdate(articleId, data); 
   res.status(200).json({
      status: 'success',
      updatedData: data
   })
})

// exports.updateArticleImage = ()