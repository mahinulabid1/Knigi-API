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
        ImageName : {
            type : String
        }
    },

    {
        collection : 'ShopDB' // Collection name
    }
)

const ShopModel = new mongoose.model( 'shopmodel', InsertShopItemSchema );

module.exports = ShopModel;