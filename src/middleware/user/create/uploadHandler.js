const { app } = require( '@index' );
const uploadUserImage = require( '@controller/userController/fileUplaodController.js' );

app.post('/api/v1/user',async ( req, res, next ) => {
   // initial processing of request object
   try{
      await uploadUserImage(req);
      next();
   }
   catch( err ) {
      console.log(err);
      res.status(400).json({
         error: err.message
      })
   }
})