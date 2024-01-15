const catchAsync = require( '@utils/catchAsync' );
const userModel = require( '@model/userModel' );
const AppError = require('@utils/appError');

exports.idValidation = catchAsync ( async (req, res, next) => {
   let id;
   if( req.params.id ) {
      id = req.params.id;
   }else{
      return next(new AppError('ID is not found in URL parameter!', 400));
   }

   const result = await userModel.findById(id, '_id');
   if(result === null) {
      return next(new AppError('No such ID found on this database!', 400));
   }else{
      next();
   }
})

exports.deleteRecord = catchAsync( async ( req, res, next ) => {
   const id = req.params.id;
   await userModel.findOneAndDelete({'_id': id});
   res.status(200).json({
      status: 'Success',
      message: 'Data Has been deleted!'
   })
})