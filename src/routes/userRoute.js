const express = require('express');
const router = express.Router();

const createNewUser = require('@controller/userController/createNewUser');
const AWSController = require('@controller/userController/AWS.controller');
const getUser = require('@controller/userController/getUser');

router.post(
   '/newUser', 
   createNewUser.validateUsername,
   createNewUser.create
);

router.get('/allUser', getUser.allUser)

// checks if the user name is valid or not
router.get('/validateUser/:username', createNewUser.validateUsername)

router.post(
   '/userImage/:id', 
   createNewUser.multerUpload,
   AWSController.uploadAWS,
   createNewUser.uploadPicture
)

module.exports = router;