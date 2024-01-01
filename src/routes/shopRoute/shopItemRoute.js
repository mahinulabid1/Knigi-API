/**
 * contains all request related to route "/api/v1/shopItem"
 * another note is that: about application architecture
 * I can put one request is each file. That would be more readable.
 * But what if I have a large project which have hundreds of API request?
 * In that case I can CATEGORIZE all request like this way using app.route()
 * I'm building this app in a way, thinking that it will be a big complex application
 * Even it will not be that big.
 * I'm categorizing the API request.
*/


const { router, app } = require('@index');
const insertNewData = require('@controller/shopController/insertNewData.js');
const updateShopItem = require('@controller/shopController/updateController.js');

app.route('/api/v1/shopItem')
   .post(async (req, res) => {
   
      try{
         const result = await insertNewData(req);
         res.status(200).json( {
            status : result,
         } )
      } 
      
      catch(err) {
         console.log(err);

         res.status(400).json( {
            status : 'There is an error while uploading',
            error_Summary : 'One of the required filed was not given',
            required_field : {
               bookPicture : 'image file of Book',
               thumbnail : 'thumbnail image for the book that will be shown when the book is featured on website',
               productTitle: 'The name of the book',
               productAboutInfo : 'Details about the product information. What the book is about.',
               productSpecs: 'how many pages, is it off-set print, where is it printed and Dimensions',
            }
         } )
      }
   })


   .patch(async ( req, res ) => {
      try{
         await updateShopItem(req);
         res.status(200).json({
            status: 'file updated successfully!'
         })
      }
      catch(err) {
         console.log(err);
         res.status(500).json({
            status: 'upload operation failed. Please try again'
         })
      }
      
   })

