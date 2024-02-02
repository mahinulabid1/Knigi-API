const BlogModel = require('../../model/blogModel');
const catchAsync = require('@utils/catchAsync');
const AppError = require('@utils/appError')

exports.fetchAllArticle = catchAsync(async (req, res, next) => {
   const data = await BlogModel.find({});
   res.status(200).json({
      status: "success!",
      result: data.length,
      data : data
   })
})


//FETCH ARTICLE WITH PIGNATION
// each page will contain 8 result, 
// totalCount / 8 = how many page
const calculateTotalPage = (count) => {
   let totalPage = Math.round(count/8); console.log(totalPage);
   totalPage === 0 ? totalPage = 1 : totalPage = totalPage;
   console.log(`Total Page: ${totalPage}`);
   return totalPage;
}

const validatePageQueryValue = (req,totalPage) => {
   if(req.params.pageNumber > totalPage) {
      return false;
   }else {
      return true;
   }
}

const fetchPignatedData = async (req) => {
   // calculate skip and limit
   const page = req.params.pageNumber;
   const limit = 8;
   const skip = (page -1) * 8;
   console.log(`skip = ${skip}`)
   const result = await BlogModel.find({}).skip(skip).limit(limit);
   return result;
}

exports.fetchArticleWithPignation = catchAsync( async ( req, res, next) =>{
   const checkHowManyRecords = await BlogModel.countDocuments({});
   const totalPage = calculateTotalPage(checkHowManyRecords);
   if(validatePageQueryValue(req, totalPage) === false) {
      return next(new AppError('Page not found!', 404));
   }
   const fetchResult = await fetchPignatedData(req);
   res.json({
      totalData : checkHowManyRecords,
      totalPage: totalPage,
      contentCount: fetchResult.length,
      data: fetchResult
   });
})


