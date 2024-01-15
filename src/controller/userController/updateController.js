const catchAsync = require('@utils/catchAsync');
const userModel = require('@model/userModel');

exports.update = catchAsync(async (req, res, next) => {
   let id;
   if(req.params.id) {
      id = req.params.id;
   }else{
      return next(new AppError('ID is not found in the Parameter!', 400))
   }

   const result = await userModel.findByIdAndUpdate(id, req.body); 
   res.status(200).json({
      status: 'success',
      message: "update complete!",
      data : result
   })
})