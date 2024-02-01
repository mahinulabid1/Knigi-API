const BlogModel = require('@model/blogModel');
const UserModel = require('@model/userModel');
const catchAsync = require('@utils/catchAsync')
const AppError = require('@utils/appError');

exports.checkUserRole = catchAsync(async (req, res, next) => {
   // decode JWT

   // version MAIN : check user role: if user is authorized to write blog
   // version BASIC: Check if user exist
   if(req.fetchUserData === null || !req.fetchUserData) {
      // if no user found, then return error
      return next(new AppError('No username found!🤖', 404));
   }
   next();
})


exports.protectBadInputRequest = catchAsync (async (req, res, next) => {
   if(req.body.author || req.body.articlePublishedDate || req.body.articleEditDate) {
      return next(new AppError('Author, Article Publish Date and Article Edit Date inputs are not accepted! 😔'))
   }
   next();
})