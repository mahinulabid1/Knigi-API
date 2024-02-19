// initial multer configuration
const multer = require('multer');
const upload = multer ( { dest: 'upload/' } );

module.exports = { upload, multer };