const ShopModel = require ( '../model/shopModel' );
const { mongoose } = require ( '../../index' ); 

// controller fetches model 
//and do data operations

const getAllShopItem = async () => {
    try{
        const result = await ShopModel.find(
            {
                // find all
            }
        )
        return result;
    }
    
    catch ( err ) {
        console.log( err );
    }
    
}


module.exports = { getAllShopItem };