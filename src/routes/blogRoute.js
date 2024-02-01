const express = require('express');
const router = express.Router();
const authController = require('@controller/blogController/authController');
const newArticleController = require('@controller/blogController/createArticle')
const cloudinaryController = require('@cloudinary/controller')

router.post(
   '/newArticle', 
   authController.protectBadInputRequest,
   newArticleController.multerUpload,
   newArticleController.getUserDataFromDb,
   authController.checkUserRole,
   newArticleController.processDateAndAuthorInfo,
   cloudinaryController.uploadMultipleFile,
   newArticleController.createNewArticle
)


module.exports =  router;