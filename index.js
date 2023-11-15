const express = require( 'express' );
const mongoose = require ( 'mongoose' );
const router = express.Router( );
const app = express( );

module.exports = { express, app, mongoose, router };

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
// its like copy and paste 