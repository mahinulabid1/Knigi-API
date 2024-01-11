const AppError = require('@utils/appError.js');
const dotenv = require('dotenv')
dotenv.config({path: '@dotenv'});

const nodeEnvironment = process.env.NODE_ENV;

const reverseUpload = () => {
   // delete Uploaded files
}

const castErrorHandler = (err, req, res) => {
   const message = `Invalid ${err.path}: ${err.value}.`;
   //these are probably related to castError -- err.path, err.value
   return new AppError(message, 400);
}

const sendDevError = (err, req, res) => {
   return res.status(err.statusCode).json({
      status : err.statusCode,
      message : err.message,
      stack: err.stack
   })
}

const sendProdError = ( err, req, res ) => {

}

// main global error handling middleware
module.exports = (err, req, res, next) => {
   err.statusCode = err.status || 500;
   err.message = err.message || 'error';

 
   if(nodeEnvironment === 'development') {
      console.log("this is development error")
      sendDevError(err, req, res);
   } else {
      let error = {...err}
      if(err.name === "CastError") error = castErrorHandler(err);
      res.status(error.statusCode).json({
         status : "error",
         message: error.message,
         name: error.name,
         errData : {
            path : err.path,
            value: err.value
         }
      })
   }
   

  


   
}