const express = require( 'express' );
const cors = require( 'cors' );
const mongoose = require ( 'mongoose' );
const router = express.Router( );
const bodyParser = require('body-parser');  // didn't find any use yet
const AWS = require( 'aws-sdk' );
const multer = require('multer');
const app = express( );
app.use(express.json());        // doesn't work when req is sent using form-data, not raw JSON
// Enable CORS for all routes
// const corsOptions = {
//     origin: 'http://localhost:5173/', // Specify the allowed domain
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     optionsSuccessStatus: 204,
// };
  
// app.use(cors(corsOptions));                  
app.use(cors());   

const upload = multer ( { dest: 'upload/' } );


  


// Set up AWS configuration
AWS.config.update({
  accessKeyId: 'AKIAUYPP6YV4XQS665GF',
  secretAccessKey: '9TND7wbQ8GCMeAFSOvPNrz0+k1gGdrZHJ2IHMizT',
  region: 'ap-south-1' // Change to your AWS region
});

// initialize s3
const s3 = new AWS.S3();

const cloudFrontUrl = 'https://d19a566nyr3opx.cloudfront.net';


// unique key generator
function generateUniqueKey() {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base 36 string
    const randomStr = Math.random().toString(36).substr(2, 10); // Random string
    const hash = Math.random().toString(36).substr(2, 10); // Hash of random number
    
    return `${timestamp}-${randomStr}-${hash}`;
}

module.exports = { 
    express,
    app, 
    mongoose, 
    router, 
    s3, 
    generateUniqueKey, 
    bodyParser, 
    upload ,
    cloudFrontUrl
};

const url = "mongodb+srv://himahinulabid:DjYFI1UPxb5BRyJl@cluster0.kgeats8.mongodb.net/Knigi?retryWrites=true&w=majority";

// IIFE = FUNCTION CALLS ITSELF
(async () => {
    try {
        mongoose.connect(
            url
            // the url parser is deprecated, not using it anymore
        );
        console.log("Log: Succesfully Connected to the Database \n");
    }
    catch ( err ) {
        console.log( err );
    }
})();



// ROUTE SETTING
require('./src/routes/shopRoute');
require('./src/routes/userRoute');
// its like copy and paste 