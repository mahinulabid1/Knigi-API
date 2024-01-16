const express = require('express');
const router = express.Router();

const createNewUser = require('@controller/userController/createNewUser');
const AWSController = require('@controller/userController/AWS.controller');
const getUser = require('@controller/userController/getUser');
const updateController = require('@controller/userController/updateController');
const deleteController = require('@controller/userController/deleteController');
const authController = require('@controller/userController/authController')

router.post(
   '/newUser', 
   createNewUser.validateUsername,
   authController.passwordEncrypt,
   createNewUser.create
);

router.patch(
   '/user/:id', 
   updateController.update
)

router.delete(
   '/user/:id',
   deleteController.idValidation,
   deleteController.deleteRecord
)

router.get('/allUser', getUser.allUser)
router.get('/user/:id', getUser.single);

// checks if the user name is valid or not
router.get('/validateUser/:username', createNewUser.validateUsername)

// upload user image
router.post(
   '/userImage/:id', 
   createNewUser.multerUpload,
   AWSController.uploadAWS,
   createNewUser.uploadPicture
)

router.post(
   '/login', 
   authController.loginVerify
)


router.post(
   '/test',
   authController.passwordEncrypt
)
module.exports = router;