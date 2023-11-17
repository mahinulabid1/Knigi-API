// controller fetches model 
//and do data operations

const ShopModel = require ( '../model/shopModel' );
const { mongoose, generateUniqueKey, s3, app } = require ( '../../index' ); 

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


// function : uploads image to the AWS S3 bucket
const imageInput = async ( imageData ) => {

    try{
        const uniqueKey = generateUniqueKey();

        s3.putObject({
            Body: imageData,
            Key : `shopItem/${uniqueKey}.jpg`,
            Bucket: 'knigiimagedb'
        }, 
        (err, data) => {
            if(err) {
                console.log(err);
            }
            else{
                console.log("image uploaded successfully ");
            }
        })

        return uniqueKey;
    } 
    
    catch ( err ) {
        console.log( err ) ;
    }
}


// function: insert new item in mongodb, uploads image
const insertItem = async ( data, imagedata ) => { // data has to be an object, body takes the image file using fs module

    try {
        let imageName = await imageInput(imagedata); // returns the unique key
        let dataObj = JSON.parse(data);
        dataObj.productImage = `${imageName}.jpg`;
        const testInsert = new ShopModel( dataObj );
        let x = await testInsert.save( );
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