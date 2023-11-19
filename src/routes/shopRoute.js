const { 
    express, 
    app, 
    router, 
    upload, 
    s3,
    cloudFrontUrl
} = require ( '../../index' );

const { 
    getAllShopItem, 
    getItemById, 
    insertItem, 
    updateById, 
    deleteById, 
} = require ( '../controller/shopController');

app.use(express.json());
const fs = require( 'fs' );

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
                const data = await getAllShopItem( query.limit );
                res.status( 200 ).json( data );
            }

            //ask for specific item with ID
            else if( query.id !== undefined) {
                // route : http://localhost:8000/api/v1/shoplist?id=655087298290bc43b3f580a7  (mongodbID)
                const data = await getItemById( query.id );
                res.status( 200 ).json( data );
            }

        } catch( err ) {
            console.log( err );
        }
    }) 
    


    //UPDATE SHOP SPECIFIC ITEM
app
    .patch("/api/v1/shoplist" ,async (req, res) => {
        try{
            await updateById(req.query.id, req.body);
            res.status(200).send("updated");
        }
        catch (err){ 
            console.log(err)
        }
    })



// CREATE NEW SHOP ITEM
app
    .post( "/api/v1/newShopItem", upload.single('bookPicture') ,async ( req, res ) =>{  

        try{
            let image = fs.readFileSync(`${__dirname}/../../upload/${req.file.filename}`);
            await insertItem ( req.body.data, image );
            res.status(200).contentType('application/json').send({message : "Data Successfully Inserted"});

        }
        catch ( err ) {
            console.log( err );
        }
    })


app
    .delete("/api/v1/shoplist", async (req , res) => {
        await deleteById(req.query.id);
        res.status(200).send(`Deleted ${req.query.id}`);
    })


app.listen( 8000 );


