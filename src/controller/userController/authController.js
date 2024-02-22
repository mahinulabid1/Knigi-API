/**
 * this is where all the password encryption-decryption happens
 * all the jwt related work
 */
const catchAsync = require('@utils/catchAsync');
const AppError = require('@utils/appError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('@model/userModel');

const verifyPass = async (userInput, hashPass) => {
   const result = await bcrypt.compare(userInput, hashPass);
   return result;
}


const createJWT = async (username) => {
   /* 
   info: client always sends JWT in header's authorization
   google search: how to access client's header authorization
   search : how to send JWT in header's authorization
   */
   return jwt.sign({ username: username }, process.env.TOKEN_SECRET, {});
}

const authenticateJWT = async (req) => {
   const bearerHeader = req.headers['authorization'];
   const token = bearerHeader.split(' ')[1];
   return jwt.verify(token, process.env.TOKEN_SECRET);
}


// middleware
exports.passwordEncrypt = catchAsync(async (req, res, next) => {
   if (!req.body.password) return next(new AppError('password not found!', 400));
   const password = req.body.password;
   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(password, salt);
   req.body.password = hash;
   next();
})

exports.loginVerify = catchAsync(async (req, res, next) => {
   // verify pass
   // create jwt
   // send jwt as response
   let getUserData = await UserModel.find({ 'username': req.body.username }, "username password");
   if (getUserData.length === 0 ) return next(new AppError('Username or password didn\'t match', 404));

   const databasePassword = getUserData[0].password;
   const userInputPassword = req.body.password;
   const passwordVerify = await verifyPass(userInputPassword, databasePassword);


   if (passwordVerify) {
      var jwt = await createJWT(req.body.username);
   } else {
      return next(new AppError('Username of password didn\'t match', 404));
   }

   res.status(200).json({
      status: 'Login success',
      token: jwt
   })
})

exports.decodeJWT = catchAsync(async (req, res, next) => {
   const decodedInformation = await authenticateJWT(req);
   console.log(decodedInformation)
   req.tokenInfo = decodedInformation.username;
   next();
})

exports.protectUnwantedAccess = catchAsync(async (req, res, next) => {

})

exports.protectUserRole = catchAsync(async (req, res, next) =>{
   if(req.body.userRole) {
      return next(new AppError('You can not change user Role!', 400));
   }
   next();
})


exports.checkIfUserExistInDb = catchAsync(async (req, res, next) => {
   const data = await UserModel.findOne({username: req.tokenInfo}, 'username imageData');
   if(!data) {
      next(new AppError('Username not found! JWT probably malformed!', 404));
   }
   else { 
      req.userInfo = data;
      next();
   }
})

exports.preventPostInUserImage = catchAsync(async (req, res, next) =>{
   // prevent user from sending post request to update user image
   let imageNameData = req.userInfo.imageData.imageName;
   imageNameData = imageNameData.toLowerCase();
   if(imageNameData !== 'no image uploaded') {
      return next(new AppError('User already uploaded user image! Please user PATCH request to update user image', 400));
   }
   next();
})    
