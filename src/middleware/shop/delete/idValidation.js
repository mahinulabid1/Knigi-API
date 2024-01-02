const {router,app, mongoose} = require('@index');
const shopModel = require('@model/shopModel');

/**
 * RESON FOR CREATING SUCH HUGE MESS VALIDATION MIDDLEWARE
 * initially I created a error handling using catch(){}
 * where if the id has wrong format,(for example: has one digit less than actual id's digit)
 * mongoose gives an error. The error shows only if the id is wrong format.
 * 
 * When the format is correct but the id is not available in Database- 
 * it still returns "operation successful", 
 * SO the mongoose delete operation doesn't check and gives error if the id is not valid
 * It only checks if the id is valid then it if valid- delete the record  and if not valid - do nothing.
 * So no error return
 * 
 * Thats why I created this big messy validator
 */
app.route('/api/v1/shopItem')
   .delete(async ( req, res, next ) =>{
      console.log('running middleware')
      try{
         if(req.query.id === undefined) {
            res.status(404).json({
               error: 'id is not defined!'
            })
         }
         
         else {
            const id = req.query.id
            let checkId = await shopModel.find({_id : id}, '_id');
            if( checkId.length === 0){
               res.status(404).json({
                  error: "id not found!"
               })
            }
            else{
               next();
            }
         }
      }
      catch( err ) {
         if(err.message.includes('Cast to ObjectId failed')) {
            res.status(404).json({
               error: "id not found!"
            })
         }
      }
      
   })