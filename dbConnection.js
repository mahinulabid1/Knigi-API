const { mongoose } = require('@index'); 

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