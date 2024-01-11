const mongoose = require('mongoose');

const InsertShopItemSchema = new mongoose.Schema(
   {
      productTitle: {
         type: String,
         required: [true, 'productTitle is not defined']
      },

      productPrice: {
         regularPrice: Number || null || undefined,
         discountedPrice: Number || null || undefined,
         regularPriceBeforeDiscount: Number || null || undefined
      },

      productAboutInfo: {
         type: String,
         required: [true, 'productAboutInfo is not defined']
      },

      productSpecs: {
         type: String,
         required: [true, 'productAboutInfo is not defined']
      },

      imageCollection: {
         productImage: {
            url: {
               type: String,
               required: [true, 'productImage-url is not defined']
            },
            imageName: {
               type: String,
               required : [true, 'productImage-imageName is not defined']
            }
         },
         thumbnail: {
            url: {
               type: String,
               required : [true, 'thumbnail-url is not defined']
            },
            imageName: {
               type : String,
               required : [true, 'thumbnail-imageName is not defined']
            }
         }
      }
   },

   {
      collection: 'ShopDB' // Collection name
   }
)

const ShopModel = new mongoose.model('shopmodel', InsertShopItemSchema);

module.exports = ShopModel;