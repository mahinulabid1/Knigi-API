// controller fetches model 
//and do data operations

const ShopModel = require ( '../model/shopModel' );
const fs = require( 'fs' ); 
const { 
    mongoose, 
    generateUniqueKey, 
    s3, 
    app, 
    cloudFrontUrl 
} = require ( '../../index' );

const { imageInput, deleteImageFile } = require('../AWS_S3/FileController');




class UploadFile {
    constructor () {
    //     this.uploadDestination = uploadDestination; // upload Destination Folder Ex: "shopItem"
    //     this.readFile = undefined;
    //     this.fileName = fileName;       // fetches name of the file which is in the upload folder.
        this.uploadStatus = undefined;  
    }


    image(fileName, uploadDestination) {
        // read image file where mutler temporary moved file in Application directory 
        const readFile = fs.readFileSync(`${__dirname}/../../upload/${fileName}`); 
        const uniqueKey = generateUniqueKey();

        s3.putObject({

            Body: imageData,
            Key : `${uploadDestination}/${uniqueKey}.jpg`,  // do not start with "/", it will create a file with name "/"
            Bucket: 'knigiimagedb',
            ACL: "public-read",

        }, (err) => {

            err ? console.log(err) : this.uploadStatus = "Log: S3 Image Upload Successfully completed.";

        });

        return uniqueKey;
    }


    debugUploading () {
        // this function runs debug functionality using console.

        console.log(this.productImage);
    }
}


class UploadData {
    constructor(dataObj, fileNameCollection) {
        this.dataObj = dataObj;
        this.fileNameCollection = fileNameCollection;
    }

    shopData() {
        // upload data to mongodb
        this.dataObj = JSON.parse(this.dataObj);
        const productImage = this.fileNameCollection.productImage;
        const thumbnail = this.fileNameCollection.thumbnail;

        const imageInfo = {

            productImage : {
                url : `${cloudFrontUrl}/shopItem/${productImage}.jpg`,
                imageName :  `${productImage}.jpg`
            },

            thumbnail : {
                url : `${cloudFrontUrl}/shopItem/${imageInfo}.jpg`,
                imageName: `${thumbnail}.jpg`
            }
        }
    }

    userDataUpload () {
        // will upload user related data to database soon.
    }
}
















// class DataContainer {
//     constructor(data) {
//         // data has to be an object
//         // accessing an object that has been returned by function caller
//         /* 
//         functionCaller( 
//             { 
//                 data:datavalue, 
//                 productImage: value, 
//                 thumbnailImage: value 
//             } 
//         ) 
//         = is how to pass arguments to caller 
//         */

//         this.data = data.data;                   // contains JSON text data sent by form-data [fetched from: shopRoute.js]
//         this.productImage = data.productImage;       // contains file sent by "form-data" using key:"bookPicture"
//         this.thumbnailImage = data.thumbnailImage;   // contains file sent by "form-data" using key:"thumbnail"
//         this.limit = data.limit;
//         this.id = data.id;
//     }
// }


// class UploadFile extends DataContainer{
//     constructor() {
//         this.a = "";
//         this.b = ""
//     }

//     s3ReadFile () {    
//         this.a = imageInput(this.productImage);        // returns the unique key/name for the image, uploads image to S3 bucket
//         this.b = imageInput(this.thumbnailImage);
//     }

// }


// class DataHandler extends UploadFile{
//     // responsible for creating data object From MODEL 
//     constructor( ) {
//         this.dataFinal = ""
//     }

//     DataHandler () {
//         let ParsedObject = JSON.parse(this.data);
//         let TempObject = {

//             productImage : {
//                 url : `${cloudFrontUrl}/shopItem/${a}.jpg`,
//                 imageName :  `${a}.jpg`
//             },

//             thumbnail : {
//                 url : `${cloudFrontUrl}/shopItem/${b}.jpg`,
//                 imageName: `${b}.jpg`
//             }
//         }

//         ParsedObject.imageCollection = TempObject;
//         this.dataFinal = ParsedObject;
//     }

// }


// class DataBaseOperation extends DataHandler{
//     insertData () {
//         this.dataFinal.save();
//     }
// }









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



module.exports = { 
    getAllShopItem, 
    getItemById, 
    // insertItem, 
    updateById, 
    deleteById, 
    UploadFile,
    UploadData };