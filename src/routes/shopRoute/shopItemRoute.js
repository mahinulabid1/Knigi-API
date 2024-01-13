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

const express = require('express');
const router = express.Router();
const newDataController = require('@controller/shopController/newDataController.js');
const getShopItem = require( '@controller/shopController/getShopItem.js' );
const updateShopItem = require('@controller/shopController/updateController.js');
const deleteController = require('@controller/shopController/deleteController.js');
const awsController = require('@controller/shopController/AWS.controller');


router.route('/shopItem')
   .post(
      newDataController.multerUpload,
      awsController.uploadAWS,
      newDataController.parseBody,
      newDataController.insertNewData
   )
   .patch(
      updateShopItem.multerUpload,
      updateShopItem.parseBody,
      updateShopItem.update
   )
   .get(getShopItem.all)


router.route('/shopItem/:id')
   .get(getShopItem.single)
   .delete(
      deleteController.idValidation,
      deleteController.deleteRecord
   )


module.exports = router;



// async (req, res) => {
   
//    try{
//       const result = await insertNewData(req);
//       res.status(200).json( {
//          status : result,
//       } )
//    } 
   
//    catch(err) {
//       console.log(err);

//       res.status(400).json( {
//          status : 'There is an error while uploading',
//          error_Summary : 'One of the required filed was not given',
//          required_field : {
//             bookPicture : 'image file of Book',
//             thumbnail : 'thumbnail image for the book that will be shown when the book is featured on website',
//             productTitle: 'The name of the book',
//             productAboutInfo : 'Details about the product information. What the book is about.',
//             productSpecs: 'how many pages, is it off-set print, where is it printed and Dimensions',
//          }
//       } )
//    }
// }