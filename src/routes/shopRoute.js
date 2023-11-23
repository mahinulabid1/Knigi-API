const fs = require( 'fs' );

const { 
    express, 
    app, 
    router, 
    upload, 
    s3,
    cloudFrontUrl } = require ( '../../index' );

const { 
    getAllShopItem, 
    getItemById, 
    // insertItem, 
    updateById, 
    deleteById, 
    // UploadFile,
    UploadData,
    GetData,
    DeleteRecord,
    UpdateDB } = require ( '../controller/shopController');

const { UploadFile, DeleteFile } = require( '../AWS_S3/FileController' );

app.use(express.json());

const uploadFile = new UploadFile();
const uploadData = new UploadData();
const fetchData = new GetData();
const deleteRecord = new DeleteRecord();
const deleteFile = new DeleteFile();
const update = new UpdateDB();



//default routing
app
    .get ( "/", ( req, res ) => {
        res.status ( 200 ).send ( "This is Homepage" );
    })


// GET ALL SHOP ITEM OR SINGLE ITEM BY ID
app
    .get( '/api/v1/shoplist' ,async ( req, res ) => {
        let query = req.query;

        try{

            // send all shop item list
            if(query.id === undefined){
                const data = await fetchData.allShopItem( query.limit );
                res.status( 200 ).json( data );
            }

            //ask for specific item with ID
            else if( query.id !== undefined) {
                // route : http://localhost:8000/api/v1/shoplist?id=655087298290bc43b3f580a7  (mongodbID)
                const data = await fetchData.getItemById( query.id );
                res.status( 200 ).json( data );
            }

        } catch( err ) {
            console.log( err );
        }
    }) 
    


    //UPDATE SHOP SPECIFIC ITEM
app
    .patch("/api/v1/shoplist" ,upload.array(), async (req, res) => {
        const id = req.query.id;
        const dataToUpdate = JSON.parse(req.body.data); 

        try{
            await update.itemById(id, dataToUpdate);
            // await updateById(req.query.id, req.body);
            res.status(200).send("updated");
        }
        catch (err){ 
            console.log(err)
        }
    })



// CREATE NEW SHOP ITEM
const fileFields = [
    {
        name : 'bookPicture',
        maxCount : 1
    },
    {
        name : 'thumbnail',
        maxCount : 1
    }
]

app
    .post( "/api/v1/newShopItem", upload.fields(fileFields) ,async ( req, res ) =>{  
        // INFO: req.fields give an array containing multiple object
        // INFO: to acces filename = req.files.keyname[0].filename 

        try{   
            const image1 = req.files.bookPicture[0].filename;
            const image2 = req.files.thumbnail[0].filename;
            const bodyData = req.body.data;     // data is the keyname of form-data


            const productImage = uploadFile.image(image1, "shopItem");      // returns name of uploaded image
            const thumbnailImage = uploadFile.image(image2, "shopItem");    // returns name of uploaded image
            
            uploadData.shopData(
                bodyData, 
                { productImage: productImage, thumbnail: thumbnailImage }
            );

            res.status(200).contentType('application/json').send({message : "Data Successfully Inserted"});
        }

        catch ( err ) {
            console.log( err );
        }
    })


app
    .delete("/api/v1/shoplist", async (req , res) => {
        const id = req.query.id;
        const data = await fetchData.getItemById( id );     // fetched related data before deleting 
        const ProductImageUrl = data.imageCollection.productImage.url;
        const thumbnailUrl = data.imageCollection.thumbnail.url;
        deleteFile.image(ProductImageUrl);  // delete productimage
        deleteFile.image(thumbnailUrl);     // delete thumbnail image

        await deleteRecord.whereId( id );
        res.status(200).send(`Deleted ${ id }`);
    })


app.listen( 8000 );


