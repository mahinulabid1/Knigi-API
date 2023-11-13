const { mongoose } = require( '../../index' );

const InsertShopItemSchema = new mongoose.Schema(
    {
        productTitle : {
            type : String,
            required : true,
        },

        productPrice : {
            regularPrice : Number,
            discountedPrice : Number,
            regularPriceBeforeDiscount : Number
        },

        productAboutInfo : {
            type : String,
            required : true
        },

        productSpecs : {
            type : String,
            required : true
        }
    },

    {
        collection : 'ShopDB' // Collection name
    }
)

const ShopModel = new mongoose.model( 'shopmodel', InsertShopItemSchema );

module.exports = ShopModel;