const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv')

dotenv.config({path: './confiv.env'});
          
cloudinary.config({ 
  cloud_name: 'dduplidms', 
  api_key: '524624757644866', 
  api_secret: 'Qt_-0oWuJdYiKo8Q7uiS-0h2dZw' ,
  secure: true
});

// cloudinary.config({
//    secure: true
//  });


module.exports = cloudinary