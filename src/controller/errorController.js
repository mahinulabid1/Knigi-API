const AppError = require('@utils/appError');
const mongoose = require('mongoose')
const cloudinaryController = require('@src/cloudinaryStorage/controller');
const dotenv = require('dotenv')
dotenv.config({ path: '@dotenv' });

const nodeEnvironment = process.env.NODE_ENV;

const uploadRollback = async (req) => {
   // delete Uploaded files
   const isUploadPerformed = req.isFileUploaded.status; // true or false
   const filePublicIdArr = req.isFileUploaded.publicIdArr;

   if (isUploadPerformed) {
      for (let i = 0; i < filePublicIdArr.length; i++) {
         await cloudinaryController.deleteImage(filePublicIdArr[0])
         console.log(`File Upload RollBack SuccesFul! Public ID ${filePublicIdArr[0]}`);
      }
   }

}

const castErrorHandler = (err, req, res) => {
   const message = `Invalid ${err.path}: ${err.value}.`;
   //these are probably related to castError -- err.path, err.value
   return new AppError(message, 400);
}

const duplicateKeyHandler = err => {
   const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

   const message = `Duplicate field value: ${value}. Please use another value!`;
   return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
   console.log('running validation error');
   const errors = Object.values(err.errors).map(el => el.message);

   const message = `Invalid input data. ${errors.join('. ')}`;
   return new AppError(message, 400);
};


const handleJWTError = () => {
   new AppError('Invalid token. Please log in again!', 401);
}

const handleJWTExpiredError = () => {
   new AppError('Your token has expired! Please log in again.', 401);
}

const sendDevError = (err, req, res) => {
   if (req.originalUrl.startsWith('/api')) {
      return res.status(err.statusCode).json({
         status: err.status,
         error: err,
         message: err.message,
         stack: err.stack
      });
   }
}

const sendErrorProd = (err, req, res) => {
   // A) API
   if (req.originalUrl.startsWith('/api')) {
      // A) Operational, trusted error: send message to client
      if (err.isOperational) {
         return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
         });
      }
      // B) Programming or other unknown error: don't leak error details
      // 1) Log error
      console.error('ERROR 💥', err);
      // 2) Send generic message
      return res.status(500).json({
         status: 'error',
         message: 'Something went very wrong!'
      });
   }

};

// main global error handling middleware
module.exports = (err, req, res, next) => {
   uploadRollback(req);
   err.statusCode = err.statusCode || err.status || 500;
   err.message = err.message || 'error';


   if (nodeEnvironment === 'development') {
      console.log(err);
      sendDevError(err, req, res);
   }
   else {
      let error = { ...err }
      const isValidationErr = err instanceof mongoose.Error.ValidationError;
      console.log(err instanceof mongoose.Error.ValidationError);
      // console.log(error)
      if (error.name === 'CastError') { error = castErrorHandler(error); }
      if (error.code === 11000) { error = duplicateKeyHandler(error); }
      if (isValidationErr) {
         error = handleValidationErrorDB(error);
      }
      if (error.name === 'JsonWebTokenError') error = handleJWTError();
      if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
      sendErrorProd(error, req, res);
   }

}