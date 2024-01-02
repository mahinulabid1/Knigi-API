const { app } = require('@index');
const { upload } = require('@multer.config.js');

const fileFields = [
   {
      name: 'profilePicture',
      maxCount: 1
   },
]

app.post('/api/v1/user', upload.fields(fileFields), (req, res, next) => {
   // initial processing of request object
   next();
})