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

exports.single = catchAsync(async (req, res, next)=> {
   let id;
   if(req.params.id) {
      id = req.params.id
   }else {
      return next(new AppError('Id is undefined!', 400));
   }

   const data = await userModel.findById(id);
   res.status(200).json({
      status: 'success',
      data : data
   })
})