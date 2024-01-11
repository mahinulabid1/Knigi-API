const moduleAlias = require('module-alias/register')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const { app } = require('@index');


const nonProcessedURL = process.env.MONGODB_CONNECT_URL;
const password = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DATABASE_NAME;
let url = nonProcessedURL.replace('<password>', password);
url = url.replace("<databaseName>", dbName);

// DATABASE CONNECTION
mongoose.connect(
   url
   // the url parser is deprecated, not using it anymore
).then(() =>{
   console.log("Log: Succesfully Connected to the Database \n");
});
      

app.listen(8000);