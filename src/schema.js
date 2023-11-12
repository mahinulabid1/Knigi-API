const mongoose = require('mongoose');

const InsertShopItemSchema = new mongoose.Schema(
    {
        productTitle : {
            type: String,
            required: true,
        },

        productPrice : {
            regularPrice : Number,
            discountedPrice : Number,
            regularPriceBeforeDiscount :Number
        },

        productAboutInfo : {
            type : String,
            required : true
        },

        productSpecs : {
            type:String,
            required: true
        }
    } ,

    {
        collection: "ShopDB"
    }
)

const ShopModel = new mongoose.model("shopmodel", InsertShopItemSchema);

module.exports = ShopModel;