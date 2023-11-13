// const { get } = require ( 'mongoose' );
const { app } = require ( '../../index' );
const { getAllShopItem } = require ( '../controller/shopController');


// send all shop item list
app.get( '/api/v1/shoplist' , ( req, res ) => {

    getAllShopItem()

    .then( ( resolve ) =>{
        res.status( 200 ).json( resolve );
    }) 

    .catch( ( err ) =>{
        console.log( err );
    })

});

app.listen( 8000 );