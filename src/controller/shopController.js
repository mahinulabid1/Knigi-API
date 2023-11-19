// controller fetches model 
//and do data operations

const ShopModel = require ( '../model/shopModel' );
const { 
    mongoose, 
    generateUniqueKey, 
    s3, 
    app, 
    cloudFrontUrl 
} = require ( '../../index' );

const { imageInput, deleteImageFile } = require('../AWS_S3/FileController');


//GET ALL ITEM FROM THE DATABASE
const getAllShopItem = async ( limit ) => {

    try{
        if(limit === undefined ) {
            const result = await ShopModel.find( { /* find all */ } );
            return result;
        }
        else if(limit !== undefined ) {
            const result = await ShopModel.find( { /* find all */ } ).limit(limit);     // fetching data from MongoDB
            return result;
        }
        
    }
    
    catch ( err ) {
        console.log( err );
    }
    
}





// GET ONE ITEM BY ID
const getItemById  = async ( id ) => {

    try{
        const result = await ShopModel.findById(id);
        return result;
    }
    catch ( err ) {
        console.log(err);
    }

}





// function: insert new item in mongodb, uploads image
// insert using form-data
const insertItem = async ( data, imagedata ) => {       // data has to be an object, body takes the image file using fs module

    try {
        let imageName = await imageInput(imagedata);    // returns the unique key, upload image to S3 bucket
        let dataObj = JSON.parse(data);                 // JSON data got from req.body.key, app.use(express.json()) cant pase form-data
        dataObj.productImage = `${cloudFrontUrl}/shopItem/${imageName}.jpg`;
        dataObj.imageName = `${imageName}.jpg`
        console.log(dataObj.ImageName);
        console.log(dataObj)
        const testInsert = new ShopModel( dataObj );
        await testInsert.save( );
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
        let data = await getItemById( id );
        data = data.ImageName;

        if(data !== undefined) {
            console.log(data);
            deleteImageFile( `shopItem/${data}`);
            
        }
        else {
            console.log("Log: Data is undefined. Aborting Image Deletion Operation");
        }

        await ShopModel.deleteOne({_id: id}) // {"_id": id} this "" is wrong, I kept getting error
    }
    
    catch ( err ){ 
        console.log(err);
    }
}



module.exports = { getAllShopItem, getItemById, insertItem, updateById, deleteById };