const express = require('express');
const router = express.Router();
const app = express();
app.listen(8000);

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
app.use(express.json());

module.exports = {
   express,
   app,
   mongoose,
   router,
   bcrypt,
   dotenv,
   jwt,
};

//DB CONNECT
require('./dbConnection');

// ROUTE SETTING
require('./src/middleware/main');
// middleware must be declared before router

require('./src/routes/shopRoute');
require('./src/routes/userRoute');

