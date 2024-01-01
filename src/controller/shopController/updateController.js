const shopModel = require('@model/shopModel');

const updateShopItem = async (req) => {
   try{
      const id = req.query.id;
      console.log(id);
      const data = req.body.knigi_parsedData;
      await shopModel.findByIdAndUpdate(id, data );
   }
   catch(err) {
      throw new Error(err);
   }
}

module.exports = updateShopItem;