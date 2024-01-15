const catchAsync = require('@utils/catchAsync');
const userModel = require('@model/userModel');

exports.allUser = catchAsync(async ( req, res, next) => {
   const result = await userModel.find({});
   
   if( result.length === 0 ){
      res.status(200).json({
         status: 200,
         message: "No data found!"
      })
   } else {
      res.status(200).json({
         status:200,
         result : result.length,
         data : result
      })
   }
})