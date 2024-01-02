const shopModel = require('@model/shopModel');


const getShopItem = async ( req ) => {
   try{
      const query = req.query;

      if(query.id !== undefined ) {
         // get specific id
         const id = query.id;
         const result = await shopModel.findById(id);
         return result;
      }
      else {
         if(query.limit === undefined) {
            // get all data
            const result = await shopModel.find({});
            return result;
         }else {
            // get data within limit
            const limit = query.limit;
            const result = await shopModel.find({}).limit(limit);
            return result;
         }
      }
   }
   catch(err) {
      // catch the error
      // console.log(err);
      throw new Error(err);  
   }
   
}

module.exports = getShopItem;