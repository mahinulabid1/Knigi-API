const shopModel = require('@model/shopModel');

const deleteRecord = async ( req ) => {
   

   try {
      const id = req.query.id;
      await shopModel.findOneAndDelete( { _id: id } );
      return 'Operation successful'
   }
   catch (err) {  
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

module.exports = deleteRecord;