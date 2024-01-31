const express = require('express');
const router = express.Router();

const createNewUser = require('@controller/userController/createNewUser');
const AWSController = require('@controller/userController/AWS.controller');
const getUser = require('@controller/userController/getUser');
const updateController = require('@controller/userController/updateController');
const deleteController = require('@controller/userController/deleteController');
const authController = require('@controller/userController/authController')
const cloudinaryController = require('@cloudinary/controller')

router.post(
   '/newUser', 
   createNewUser.validateUsername,
   authController.passwordEncrypt,
   createNewUser.create
);

router.patch(
   '/user', 
   authController.decodeJWT,
   updateController.checkIfUserExistInDb,
   updateController.updateMongoDbData
)

router.delete(
   '/user/:id',
   deleteController.idValidation,
   deleteController.deleteRecord
)

router.get('/allUser', getUser.allUser)
router.get(
   '/user', 
   authController.decodeJWT,
   getUser.single
);

// checks if the user name is valid or not
router.get('/validateUser/:username', createNewUser.validateUsername)

// upload user image
router.post(
   '/userImage/:id', 
   createNewUser.multerUpload,
   // AWSController.uploadAWS,
   // createNewUser.uploadPicture
   cloudinaryController.uploadFile,
   createNewUser.uploadPicture
)

router.patch(
   '/userImage',
   authController.decodeJWT,
   updateController.checkIfUserExistInDb,
   updateController.fetchPreviousUserImage,
   updateController.multerUpload,
   cloudinaryController.uploadFile,
   cloudinaryController.deleteOldUserImage,
   updateController.updateImageDataInMongoDb
)

router.post(
   '/login', 
   authController.loginVerify
)


//==============================================================
//DEV MODE


router.post(
   '/test',
   // authController.passwordEncrypt
   updateController.multerUpload,
   // createNewUser.testUpload,
   updateController.test
)

router.delete(
   '/test',
   createNewUser.deleteImage
)
module.exports = router;