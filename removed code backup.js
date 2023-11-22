// From shopController.js
class DataInsertion {               // responsible for inserting data+file to MongoDB and AWS S3

    constructor(data, productImage, thumbnailImage) {
        // binding class argument to class object : I know, doesn't make sense
        this.data = data;                       // contains JSON text data sent by form-data [fetched from: shopRoute.js]
        this.productImage = productImage;       // contains file sent by "form-data" using key:"bookPicture"
        this.thumbnailImage = thumbnailImage;   // contains file sent by "form-data" using key:"thumbnail"
    }

    // responsible for uploading image to AWS S3, also returns the unique name that was given to image
    imageUpload() {

        return new Promise( (resolve, reject) => {
            let product = imageInput(this.productImage);        // returns the unique key/name for the image, uploads image to S3 bucket
            let thumbnail = imageInput(this.thumbnailImage);
    
            resolve([product, thumbnail]);
        })

    }   

    // responsible for preparing data object before insertion
    async HandleDataObj  () {
        let [product, thumbnail] = await imageUpload(productImage, thumbnailImage);

        const imageInfo = {

            productImage : {
                url : `${cloudFrontUrl}/shopItem/${product}.jpg`,
                imageName :  `${product}.jpg`
            },

            thumbnail : {
                url : `${cloudFrontUrl}/shopItem/${thumbnail}.jpg`,
                imageName: `${thumbnail}.jpg`
            }
        }

        let dataObj = JSON.parse(data);  
        dataObj.imageCollection = imageInfo;
        return dataObj;
    }


    // insert information to database
    async dataInsert () {
        let data = await HandleDataObj();
        data.save();
    }

}

// ===============================================================================
// from ShopController.js

// NEED FUNCTION TO UPLOAD TWO IMAGES ASYNCRONOUSLY 
// const imageUpload = (productImage, thumbnailImage) => {
//     return new Promise( (resolve, reject) => {
//         let product = imageInput(productImage);   // returns the unique key/name for the image, upload image to S3 bucket
//         let thumbnail = imageInput(thumbnailImage)

//         resolve([product, thumbnail]);
//     })
// }


// function: insert new item in mongodb, uploads image
// insert using form-data
// const insertItem = async ( data, productImage, thumbnailImage ) => {       // data has to be an object, (productImage,thumbnailImage) takes the image file using fs module

//     try {
//         let [product, thumbnail] = await imageUpload(productImage, thumbnailImage);    // returns the unique key/name for the image, upload image to S3 bucket
//         let dataObj = JSON.parse(data);                 // JSON data got from req.body.key, app.use(express.json()) cant pase form-data
//         console.log(dataObj);

//         // Putting more information(of Images) by following Mongoose Schema Model
//         dataObj.imageCollection = {};
//         dataObj.imageCollection.productImage = {};
//         dataObj.imageCollection.thumbnail = {};
//         dataObj.imageCollection.productImage.url = `${cloudFrontUrl}/shopItem/${product}.jpg`;
//         dataObj.imageCollection.productImage.imageName = `${product}.jpg`;
//         dataObj.imageCollection.thumbnail.url = `${cloudFrontUrl}/shopItem/${thumbnail}.jpg`;
//         dataObj.imageCollection.thumbnail.imageName = `${thumbnail}.jpg`;

//         const testInsert = new ShopModel( dataObj );
//         await testInsert.save( );
//     }

//     catch ( err ) {
//         console.log(err);
//     }
    
// }