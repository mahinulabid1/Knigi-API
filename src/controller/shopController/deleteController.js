const shopModel = require('@model/shopModel');
const catchAsync =  require('@utils/catchAsync');
const AppError = require('@utils/appError');

exports.idValidation = async ( req, res, next ) => {
   let id;
   req.params.id === undefined ? next(new AppError('ID is not defined', 400)) : id = req.params.id ;
   const result = await shopModel.findById(id, '_id');
   result === null || undefined ? next(new AppError('This ID is not a valid ID', 404)) : next();
}

exports.deleteRecord =catchAsync( async ( req, res, next ) => {
   const id = req.params.id;
   await shopModel.findOneAndDelete( { _id: id } );
   res.status(200).json({
      status : 200,
      id : id,
      message : "Record Deletion Successful"
   })
})
