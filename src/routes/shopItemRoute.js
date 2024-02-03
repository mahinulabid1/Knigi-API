/**
 * contains all request related to route "/api/v1/shopItem"
 * another note is that: about application architecture
 * I can put one request is each file. That would be more readable.
 * But what if I have a large project which have hundreds of API request?
 * In that case I can CATEGORIZE all request like this way using app.route() or router.route().get().post() etc
 * I'm building this app in a way, thinking that it will be a big complex application
 * Even it will not be that big.
 * I'm categorizing the API request.
*/

const express = require('express');
const router = express.Router();
const newDataController = require('@controller/shopController/newDataController.js');
const getShopItem = require('@controller/shopController/getShopItem.js');
const updateShopItem = require('@controller/shopController/updateController.js');
const deleteController = require('@controller/shopController/deleteController.js');
const cloudinaryController = require('@cloudinary/controller')

router.route('/shopItem')
   .post(
      newDataController.multerUpload,
      cloudinaryController.uploadShopItemFiles,
      newDataController.parseBody,
      newDataController.uploadDataToMongoDb
   )
   .get(getShopItem.all)

router.patch(
   '/shopItem/id/:idValue',
   // updateShopItem.multerUpload,
   // cloudinaryController.uploadShopItemFiles, // update files feature will be in later version
   updateShopItem.parseBody,
   updateShopItem.update
)

router.route('/shopItem/:id')
   .get(getShopItem.single)
   .delete(
      deleteController.fetchDataFromDb,
      deleteController.isDataValid,
      cloudinaryController.deleteMultipleImage,
      deleteController.deleteRecord
   )

router.post(
   '/test',
   newDataController.multerUpload,
   newDataController.test
)


module.exports = router;
