const express = require( 'express' );
const cors = require( 'cors' );
const mongoose = require ( 'mongoose' );
const router = express.Router( );
const bodyParser = require('body-parser');  // didn't find any use yet
// const AWS = require( '@aws-sdk' );

const { S3 } = require('@aws-sdk/client-s3');

const multer = require('multer');
const bcrypt = require( 'bcrypt' );
const jwt = require( 'jsonwebtoken' );
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = express( );
app.use(express.json());        // doesn't work when req is sent using form-data, not raw JSON                
app.use(cors());

const upload = multer ( { dest: 'upload/' } );





// Set up AWS configuration
// JS SDK v3 does not support global configuration.
// Codemod has attempted to pass values to each service client in this file.
// You may need to update clients outside of this file, if they use global config.
// AWS.config.update({
//   accessKeyId: 'AKIAUYPP6YV4XQS665GF',
//   secretAccessKey: '9TND7wbQ8GCMeAFSOvPNrz0+k1gGdrZHJ2IHMizT',
//   region: 'ap-south-1' // Change to your AWS region
// });

// initialize s3
const s3 = new S3({
    credentials: {
        accessKeyId: 'AKIAUYPP6YV4XQS665GF',
        secretAccessKey: '9TND7wbQ8GCMeAFSOvPNrz0+k1gGdrZHJ2IHMizT'
    },

    // Change to your AWS region
    region: 'ap-south-1'
});




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
    cloudFrontUrl,
    bcrypt,
    dotenv,
    jwt
};

// const url = "mongodb+srv://himahinulabid:DjYFI1UPxb5BRyJl@cluster0.kgeats8.mongodb.net/Knigi?retryWrites=true&w=majority";
const nonProcessedURL = process.env.MONGODB_CONNECT_URL;
const password = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DATABASE_NAME;
let url = nonProcessedURL.replace('<password>', password);
url = url.replace("<databaseName>", dbName);

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
