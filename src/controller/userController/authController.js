/**
 * this is where all the password encryption-decryption happens
 * all the jwt related work
 */
const catchAsync = require('@utils/catchAsync');
const AppError = require('@utils/appError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('@model/userModel');

const verifyPass =async (userInput, hashPass) => {
   const result = await bcrypt.compare(userInput, hashPass);
   return result;
}


const createJWT = async ( username ) => {
   /* 
   info: client always sends JWT in header's authorization
   google search: how to access client's header authorization
   search : how to send JWT in header's authorization
   */
   return jwt.sign(username, process.env.TOKEN_SECRET, {});
}

const authenticateJWT = async (token) => {
   return jwt.verify(token, process.env.TOKEN_SECRET);
}


// middleware
exports.passwordEncrypt = catchAsync( async ( req, res, next ) => {
   if(!req.body.password) return next(new AppError('password not found!', 400));
   const password = req.body.password;
   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(password, salt);
   req.body.password = hash;
   next();
})

exports.loginVerify = catchAsync( async (req, res, next) => {
   // verify pass
   // create jwt
   // send jwt as response
   let getUserData = await UserModel.find({'username' : req.body.username}, "username password");
   if (getUserData === null) return next(new AppError('Username of password didn\'t match'), 404);
   const databasePassword = getUserData[0].password;
   const userInputPassword = req.body.password;
   const passwordVerify = verifyPass(userInputPassword, databasePassword);
   if(passwordVerify) {
      var jwt = await createJWT(req.body.username);
      console.log(jwt);
   } else {
      next(new AppError('Username of password didn\'t match'), 404);
   }
   
   res.status(200).json({
      status : 'Login success',
      token : jwt
   })
})


exports.protectUnwantedAccess = catchAsync( async (req, res, next) => {
   
})

