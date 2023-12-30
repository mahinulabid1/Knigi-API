const { app } = require('@index');
const insertNewData = require('@controller/shopController/insertNewData.js');


app.post("/api/v1/newShopItem", async (req, res) => {
   try{
      const result = await insertNewData(req);
      res.status(200).json( {
         status : result,
      } )

   } catch(err) {
      console.log(err);

      res.status(400).json( {
         status : 'There is an error while uploading',
         error_Summary : 'One of the required filed was not given',
         required_field : {
            bookPicture : 'image file of Book',
            thumbnail : 'thumbnail image for the book that will be shown when the book is featured on website',
            productTitle: 'The name of the book',
            productAboutInfo : 'Details about the product information. What the book is about.',
            productSpecs: 'how many pages, is it off-set print, where is it printed and Dimensions',
         }
      } )
   }
})

