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

    try {
        if ( limit === undefined ) {
            const result = await ShopModel.find( { /* find all */ } );
            return result;
        }
        else if ( limit !== undefined ) {
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


// class DataInsertion {
//     constructor(data, productImage, thumbnailImage) {
//         this.data = data;   // binding class argument to class object : I know, doesn't make sense
//         this.productImage = productImage;
//         this.thumbnailImage = thumbnailImage;
//     }

//     imageUpload() {

//     }
// }

// NEED FUNCTION TO UPLOAD TWO IMAGES ASYNCRONOUSLY 
const imageUpload = (productImage, thumbnailImage) => {
    return new Promise( (resolve, reject) => {
        let product = imageInput(productImage);   // returns the unique key/name for the image, upload image to S3 bucket
        let thumbnail = imageInput(thumbnailImage)

        resolve([product, thumbnail]);
    })
}


// function: insert new item in mongodb, uploads image
// insert using form-data
const insertItem = async ( data, productImage, thumbnailImage ) => {       // data has to be an object, (productImage,thumbnailImage) takes the image file using fs module

    try {
        let [product, thumbnail] = await imageUpload(productImage, thumbnailImage);    // returns the unique key/name for the image, upload image to S3 bucket
        let dataObj = JSON.parse(data);                 // JSON data got from req.body.key, app.use(express.json()) cant pase form-data
        console.log(dataObj);

        // Putting more information(of Images) by following Mongoose Schema Model
        dataObj.imageCollection = {};
        dataObj.imageCollection.productImage = {};
        dataObj.imageCollection.thumbnail = {};
        dataObj.imageCollection.productImage.url = `${cloudFrontUrl}/shopItem/${product}.jpg`;
        dataObj.imageCollection.productImage.imageName = `${product}.jpg`;
        dataObj.imageCollection.thumbnail.url = `${cloudFrontUrl}/shopItem/${thumbnail}.jpg`;
        dataObj.imageCollection.thumbnail.imageName = `${thumbnail}.jpg`;

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

    await ShopModel.findByIdAndUpdate( id, data, option);       // data = firstName: "john", change firstName field Value to "john"
    
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

        await ShopModel.deleteOne({_id: id})            // {"_id": id} this "" is wrong, I kept getting error
    }
    
    catch ( err ){ 
        console.log(err);
    }
}



module.exports = { getAllShopItem, getItemById, insertItem, updateById, deleteById };