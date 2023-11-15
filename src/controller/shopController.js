// controller fetches model 
//and do data operations

const ShopModel = require ( '../model/shopModel' );
const { mongoose } = require ( '../../index' ); 

const getAllShopItem = async () => {

    try{
        const result = await ShopModel.find( { /* find all */ } );
        return result;
    }
    
    catch ( err ) {
        console.log( err );
    }
    
}


const getItemById  = async ( id ) => {

    try{
        const result = await ShopModel.findById(id);
        return result;
    }
    catch ( err ) {
        console.log(err);
    }

}


const insertItem = async ( data ) => { // data has to be an object

    try {
        const testInsert = new ShopModel( data );
        testInsert.save( );
    }

    catch ( err ) {
        console.log(err);
    }
    
}

// UPDATE SHOP ITEM
const updateById = async (id, data, option) => {
    if( option === undefined) {
        option = null;
    }

    await ShopModel.findByIdAndUpdate( id, data, option);
    
}


//DELETE SHOP ITEM
const deleteById= async ( id ) => {
    try {
        await ShopModel.deleteOne({_id: id}) // {"_id": id} this "" is wrong, I kept getting error
    }
    
    catch ( err ){ 
        console.log(err);
    }
}



module.exports = { getAllShopItem, getItemById, insertItem, updateById, deleteById };