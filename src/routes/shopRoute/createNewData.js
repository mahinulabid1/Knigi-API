const { app } = require('@index');
const { s3FileDelete } = require('@awsS3/s3.deleteController.js');
const ShopModel = require('@model/shopModel');

app.post("/api/v1/newShopItem", async (req, res) => {
   try {
      const data = req.body.knigi_parsedData;
      const finalData = new ShopModel(data);
      await finalData.save();
      res.send("data uploaded");
   } catch (err) {
      /*
      - if there is an error uploading database image then
      - delete the file that was uploaded
      */
      let imageCollection = req.body.knigi_parsedData.imageCollection;
      let filePathProcess1 = imageCollection.productImage.imageName;
      filePathProcess1 = `/testUpload/shopItem/${filePathProcess1}`;
      let filePathProcess2 =  imageCollection.thumbnail.imageName
      filePathProcess2 = `/testUpload/shopItem/${filePathProcess2}`;

      s3FileDelete(filePathProcess1);
      s3FileDelete(filePathProcess2);
      
      res.status(400).json({
         message : "There is a problem while uploading the file",
         error : err
      })
   }

})

