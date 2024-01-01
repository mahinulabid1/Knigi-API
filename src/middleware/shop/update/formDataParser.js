const { app } = require('@index');
// const cloudfront = process.env.CLOUDFRONT_URL;


// update shopItem
app.patch('/api/v1/shopItem', async (req, res, next) => {

   const parsedData = {
      productTitle: req.body.productTitle,

      productPrice: {
         regularPrice: req.body.regularPrice,
         discountedPrice: req.body.discountedPrice,
         regularPriceBeforeDiscount: req.body.regularPriceBeforeDiscount
      },

      productAboutInfo: req.body.productAboutInfo,
      productSpecs: req.body.productSpecs,

   }

   req.body.knigi_parsedData = parsedData;
   next();
})