/*
- the first middleware of shop
- it has to be at top of all shop middleware in ../main.js file.
*/

const { app } = require('@index');
const { upload } = require('@multer.config');

const fileFields = [
   {
      name: 'bookPicture',
      maxCount: 1
   },
   {
      name: 'thumbnail',
      maxCount: 1
   }
]

app.patch('/api/v1/shopItem', upload.fields(fileFields), async (req, res, next) => {
   // I can only use upload.fields(fileFields) once for each request. can't use twice.
   next();
})