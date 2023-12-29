const express = require('express');
const app = express();
app.listen(8000);
const router = express.Router();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// requiring module-alias to use its functionality
require('module-alias/register')


const cors = require('cors');
app.use(cors());

// middleware
app.use(express.json());        // doesn't work when req is sent using form-data


module.exports = {
   express,
   app,
   mongoose,
   router,
   bcrypt,
   dotenv,
   jwt
};

// const url = "mongodb+srv://himahinulabid:DjYFI1UPxb5BRyJl@cluster0.kgeats8.mongodb.net/Knigi?retryWrites=true&w=majority";
// IIFE
(async () => {
   try {
      const nonProcessedURL = process.env.MONGODB_CONNECT_URL;
      const password = process.env.MONGODB_PASSWORD;
      const dbName = process.env.MONGODB_DATABASE_NAME;
      let url = nonProcessedURL.replace('<password>', password);
      url = url.replace("<databaseName>", dbName);

      mongoose.connect(
         url
         // the url parser is deprecated, not using it anymore
      );
      console.log("Log: Succesfully Connected to the Database \n");
   }
   catch (err) {
      console.log(err);
   }
})();



// ROUTE SETTING
require('./src/middleware/main');
// middleware must be declared before router

require('./src/routes/shopRoute');
require('./src/routes/userRoute');

