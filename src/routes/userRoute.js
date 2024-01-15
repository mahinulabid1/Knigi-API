const express = require('express');
const router = express.Router();

const createNewUser = require('@controller/userController/createNewUser');
const AWSController = require('@controller/userController/AWS.controller');
const getUser = require('@controller/userController/getUser');
const updateController = require('@controller/userController/updateController')

router.post(
   '/newUser', 
   createNewUser.validateUsername,
   createNewUser.create
);

router.patch(
   '/user/:id', 
   updateController.update
)

router.get('/allUser', getUser.allUser)
router.get('/user/:id', getUser.single);

// checks if the user name is valid or not
router.get('/validateUser/:username', createNewUser.validateUsername)

router.post(
   '/userImage/:id', 
   createNewUser.multerUpload,
   AWSController.uploadAWS,
   createNewUser.uploadPicture
)

module.exports = router;