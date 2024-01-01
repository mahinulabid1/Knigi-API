const { app } = require('@index');
const imageUpload = require('@controller/shopController/fileUploadController.js')

app.post("/api/v1/shopItem", async (req, res, next) => {

   try{
      await imageUpload(req);
      next();
   }catch(err) {
      res.status(400).json({
         upload_status: 'failed',
         details: err
      })
   }

})