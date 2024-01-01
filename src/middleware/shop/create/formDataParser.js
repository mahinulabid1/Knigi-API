const { app } = require('@index');
const cloudfront = process.env.CLOUDFRONT_URL;

app.post('/api/v1/shopItem', async (req, res, next) => {
   //console.log(req.body.knigi_parsedData); // getting undefined

   const parsedData = {
      productTitle: req.body.productTitle,

      productPrice: {
         regularPrice: req.body.regularPrice,
         discountedPrice: req.body.discountedPrice,
         regularPriceBeforeDiscount: req.body.regularPriceBeforeDiscount
      },

      productAboutInfo: req.body.productAboutInfo,
      productSpecs: req.body.productSpecs,

      imageCollection: {

         productImage: {
            url: `${cloudfront}/testUpload/shopItem/${req.body.bookPicture}`,
            imageName: req.body.bookPicture
         },

         thumbnail: {
            url: `${cloudfront}/testUpload/shopItem/${req.body.thumbnail}`,
            imageName: req.body.thumbnail
         }

      }
   }

   req.body.knigi_parsedData = parsedData;
   next();
})