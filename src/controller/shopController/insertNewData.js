/*
- insert the parsed data in mongoDB
*/
const { s3FileDelete } = require('@awsS3/s3.deleteController.js');
const ShopModel = require('@model/shopModel');

const insertNewData = async (req ) => {
   try {
      const data = req.body.knigi_parsedData;
      const finalData = new ShopModel(data);
      await finalData.save();
      return "Data Uploaded"
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
      
      throw new Error(err);
   }
}


module.exports = insertNewData;