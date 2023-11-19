const { mongoose } = require( '../../index' );

const InsertShopItemSchema = new mongoose.Schema(
    {
        productTitle : {
            type : String,
            required : true,
        },

        productPrice : {
            regularPrice : String,
            discountedPrice : String,
            regularPriceBeforeDiscount : String
        },

        productAboutInfo : {
            type : String,
            required : true
        },

        productSpecs : {
            type : String,
            required : true
        },
        productImage : {
            type : String,
            required : true
        },
        imageName : {
            type : String       // it is needed for deleting the image later from S3
        }
    },

    {
        collection : 'ShopDB' // Collection name
    }
)

const ShopModel = new mongoose.model( 'shopmodel', InsertShopItemSchema );

module.exports = ShopModel;