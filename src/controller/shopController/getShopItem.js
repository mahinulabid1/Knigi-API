const shopModel = require('@model/shopModel');


const getShopItem = async ( req ) => {
   try{
      const query = req.query;

      if(query.id !== undefined ) {
         // get specific id's data
         const id = query.id;
         const result = await shopModel.findById(id);
         const resultValidation = Object.keys(result).length === 0;

         // validation
         if( resultValidation === true ) {
            return "No Data found!"
         }
         else {
            return result;
         }
      }

      else {
         if( query.limit === undefined ) {
            // get all data
            const result = await shopModel.find( { } );

            //validation
            if(result.length === 0) {
               return 'No data found!'
            }
            else {
               return result;
            }
         }
         
         else {
            // get data within limit
            const limit = query.limit;
            const result = await shopModel.find( { } ).limit( limit );
            
            //validation
            if(result.length === 0) {
               return 'No data found!'
            }
            else {
               return result;
            }
         }

      }
   }
   catch(err) {
      const message = err.message;
      const errTypeOne = message.includes('Cast to ObjectId failed');
      if(errTypeOne === true) {
         throw new Error('Id not found!')
      }
      else {
         throw new Error(err); 
      }
   }
   
}

module.exports = getShopItem;