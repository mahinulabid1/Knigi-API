const express = require( 'express' );
const mongoose = require ( 'mongoose' );
const app = express();

const dbConnect = require('./src/db_connection');
const ShopModel = require ( './src/schema');


// DB connect
dbConnect()
.then( (resolve ) =>{
    console.log("Log: Succesfully Connected to the Database \n");
})
.catch ( ( err ) => {
    console.log(err);
});








// sample data to be inserted in database
const testInsert = new ShopModel({
    productTitle: 'Woven Issue Four',
    productPrice: {
        regularPrice: 20,
    },
    productAboutInfo: 'Issue 4 explores the paradoxes at play in our world: death and rebirth, old and new, past and future. We take on a mindset of endless growth and the many catalysts we encounter in the creative process: setbacks, loss, imagination, and serendipity. From poetry to plants, this issue looks intently into the face of the immeasurable forces that propel us forward, and meditates on our role in designing the future. From Manly, Australia to Victoria, British Columbia, from Long Beach, California to Jersey City, New Jersey, we share the stories of nine artists, designers, and entrepreneurs who are holding the tension between the past, present, and future. You’ll meet modern day poet Joekenneth Museau who channelled the loss of his mother to cancer into a guidebook for grief, Julianne Ahn who took up ceramics as a meditation, and photographer Cody Cobb whose solo expeditions take us back in time. We study the cosmology of city planning at Arcosanti, an experimental architecture site in the Arizona desert, and glimpse the mythical symbols of Antelope Canyon through the eyes of Navajo guides.',
    productSpecs : '144 pages, offset-printed and perfect bound, full color on uncoated and coated paper. Printed in Germany. Dimensions: 8.5 x 11.3 in'
});


// testInsert.save()
// .then( ( resolve ) => {
//     console.log("successfully pushed to database");
//     console.log(resolve);
// })

// fetching data from MongoDB
const b = async (criteria) => {
    try {
        let m =await ShopModel.find(
            criteria // this takes an object
        )
        return m;
    }
    
    catch (error) {
        console.log(error);
    }
} // .then() .catch () to catch the result



ShopModel.updateOne( // async functionalities
    {
        productTitle: "Woven Issue Four",
    },
    {
        // what do i wanna update
        productPrice: {
            regularPrice: 30
        },
        productTitle:"Woven testing"
    },
) // then() and catch(){}











//  ROUTING SECTION
app.get('/api/v1/shoplist', ( req, res )=>{
    // plannig to get all Shoplist from the database

    b({/* getting all shop item*/})

    .then( (result ) =>{
        // res.status(200).contentType("text/json");
        res.send(result);
    })
    
    .catch ( (err) => {
        console.log(err);
    })
})



app.listen(8000, ()=>{
    console.log("successfully hosted")
});
