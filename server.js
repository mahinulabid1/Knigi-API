const moduleAlias = require('module-alias/register')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const { app } = require('@app');


const nonProcessedURL = process.env.MONGODB_CONNECT_URL;
const password = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DATABASE_NAME;
let url = nonProcessedURL.replace('<password>', password);
url = url.replace("<databaseName>", dbName);

process.on('uncaughtException', err => {
   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
   console.log(err.name, err.message);
   process.exit(1);
 });
 

// DATABASE CONNECTION
mongoose.connect(
   url
   // the url parser is deprecated, not using it anymore
).then(() =>{
   console.log("Log: Succesfully Connected to the Database \n");
});
      

process.on('unhandledRejection', err => {
   console.log('UNHANDLED REJECTION! 💥 Shutting down...');
   console.log(err.name, err.message);
   server.close(() => {
     process.exit(1);
   });
 });
 
 process.on('SIGTERM', () => {
   console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
   server.close(() => {
     console.log('💥 Process terminated!');
   });
 });

app.listen(8000);