const multer = require('multer');
const UserModel = require('@model/userModel');
const catchAsync = require('@utils/catchAsync');
const AppError = require('@utils/appError');

const upload = multer({
   dest: 'upload/',
   limits: { fileSize: 1000 * 2000 }, // 2MB
});

exports.multerUpload = upload.single('userImage');

// create new record main
exports.create = catchAsync( async ( req, res, next ) => {
   // how user will send the data
   // if the form doesn't have enctype then it will send x-www-form-urlencoded
   // x-www-form-urlencoded has key-value pair
   req.body.gender = req.body.gender.toLowerCase();
   const data = new UserModel(req.body);
   await data.save();
   res.status(200).json({
      status: 200,
      message: 'Data uploaded successful!',
      data : data
   })
})

// upload picture seperately
exports.uploadPicture = catchAsync( async( req, res, next ) => {
   let id;
   if(req.params.id) {
      id = req.params.id 
   } else {
      return next(new AppError('ID is not defined', 400)) 
   }

   const imageData = req.body.imageData;
   console.log(imageData)
   await UserModel.findByIdAndUpdate(id, { imageData:imageData })
   res.send('operation complete!');
})

// unique user validation while creating new Record
exports.validateUsername = catchAsync(async( req, res, next ) => {
   if(req.params.username) {
      const username = req.params.username;
      const result = await UserModel.find({'username': username}, 'username');
      res.send(result);
   }
   else if(req.body.username) {
      const username = req.body.username;
      const result = await UserModel.find({'username': username}, 'username');
      if(result.length > 0 ) {
         next(new AppError('Username already exist!', 409));
      }
      else {
         next();
      }
   }
})

