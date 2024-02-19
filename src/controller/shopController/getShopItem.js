const shopModel = require('@model/shopModel');
const catchAsync = require('@utils/catchAsync.js');
const AppError = require('@utils/appError');

exports.all = catchAsync( async( req, res, next )=>{
   let result;
   if(req.query.limit) { // undefined retuns false, defined value returns true
      const limit = req.query.limit;
      result = await shopModel.find( { } ).limit( limit );
   }else {
      result = await shopModel.find( { } );
   }

   //validation
   if(Object.keys(result).length === 0){
      res.status(200).json({
         status: 'success',
         result : 'No data found!'
      })
   }else {
      res.status(200).json({
         status: 'success',
         result : result.length,
         data : {
            result
         }
      })
   }
})

exports.single = catchAsync( async (req, res, next) => {
   let id;
   req.params.id === undefined ? next(new AppError('ID is undefined!', 400)) : id = req.params.id;
   const result = await shopModel.findById(id);

   // result validation
   if(Object.keys(result).length === 0) {
      res.status(200).json({
         status: 'success',
         data : 'No data found!'
      })
   } else {
      res.status(200).json({
         status: 'success',
         data : {
            result
         }
      })
   }
})

// exports.getDataWithLimit = catchAsync(async(req, res, next) => {
//    const limit = req.query.limit;
//    console.log()
//    let data = await shopModel.find({}).limit(limit);
//    console.log(data)

//    // result validation
//    if(Object.keys(data).length === 0) {
//       res.status(200).json({
//          status: 'success',
//          data : 'No data found!'
//       })
//    } else {
//       res.status(200).json({
//          status: 'success',
//          data : {
//             data
//          }
//       })
//    }

// })