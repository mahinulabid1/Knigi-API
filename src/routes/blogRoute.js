const express = require('express');
const router = express.Router();
const authController = require('@controller/blogController/authController');
const newArticleController = require('@controller/blogController/createArticle')
const fetchData = require('@controller/blogController/fetchBlogData')
const cloudinaryController = require('@cloudinary/controller')
const update = require('@controller/blogController/updateArticle')
const deleteQuery = require('@controller/blogController/deleteArticle')

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

router.get('/allArticle', fetchData.fetchAllArticle);
router.get('/allArticle/page/:pageNumber', fetchData.fetchArticleWithPignation)
router.get('/article/:id', fetchData.fetchArticleWithId)


router.patch(
   '/article/id/:idValue',
   authController.protectBadInputRequest,
   update.updateMongodbData
);

router.delete(
   '/article/id/:idValue',
   deleteQuery.articleValidation,
   deleteQuery.fetchImagePublicId,
   cloudinaryController.deleteMultipleImage,
   deleteQuery.deleteArticle
)


module.exports =  router;

// router.get('/allArticle/limit/:limitValue');
// in this version, the update image in article will not be DEVELOPED