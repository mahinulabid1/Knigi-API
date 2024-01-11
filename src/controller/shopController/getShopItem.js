const shopModel = require('@model/shopModel');
const catchAsync = require('@utils/catchAsync.js')

exports.all = catchAsync( async( req, res, next )=>{
   let result;
   if(req.query.limit) { // undefined retuns false, defined value returns true
      const limit = query.limit;
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
   const id = req.params.id;
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

