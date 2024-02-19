const shopModel = require('@model/shopModel');
const catchAsync = require('@utils/catchAsync');
const AppError = require('@utils/appError');


const isDataAvailableInDb = (data, next) => {
   if (!data) {
      next(new AppError('No data found with this ID', 404))
      return false;
   } else {
      return true;
   }
}

exports.fetchDataFromDb = catchAsync(async (req, res, next) => {
   let id = req.params.id;
   const result = await shopModel.findById(id, 'imageCollection');

   req.fetchedData = result;
   if (result.imageCollection) {
      const imageCollection = result.imageCollection;
      req.imageIdArr = [imageCollection.productImage.publicId, imageCollection.thumbnail.publicId];
   }

   next();
})

exports.isDataValid = async (req, res, next) => {
   const data = req.fetchedData;
   !data ? next(new AppError('No data found with this ID', 404)) : next();
}

exports.deleteRecord = catchAsync(async (req, res, next) => {
   const id = req.params.id;
   await shopModel.findOneAndDelete({ _id: id });
   res.status(200).json({
      status: 200,
      id: id,
      message: "Record Deletion Successful!"
   })
})
