const { mongoose } = require( '../../index' );

const InsertShopItemSchema = new mongoose.Schema(
    {
        productTitle : {
            type : String,
            required : true,
        },

        productPrice : {
            regularPrice : Number || null,
            discountedPrice : Number || null,
            regularPriceBeforeDiscount : Number || null
        },

        productAboutInfo : {
            type : String,
            required : true
        },

        productSpecs : {
            type : String,
            required : true
        },

        imageCollection : {
            productImage: {
                url : String,
                imageName : String
            },
            thumbnail : {
                url : String,
                imageName :String
            }
        }
    },

    {
        collection : 'ShopDB' // Collection name
    }
)

const ShopModel = new mongoose.model( 'shopmodel', InsertShopItemSchema );

module.exports = ShopModel;