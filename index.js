const express = require( 'express' );
const mongoose = require ( 'mongoose' );
const app = express( );
module.exports = { app, mongoose };






const url = "mongodb+srv://himahinulabid:DjYFI1UPxb5BRyJl@cluster0.kgeats8.mongodb.net/Knigi?retryWrites=true&w=majority";


const dbConnect = async ( ) => {
    try {
        mongoose.connect(
            url
            // the url parser is deprecated, not using it anymore
        );
    }
    catch ( err ) {
        console.log( err );
    }
    
}

// DB connect
dbConnect( )

.then( ( ) =>{
    console.log("Log: Succesfully Connected to the Database \n");
})

.catch ( ( err ) => {
    console.log(err);
});





// sample data to be inserted in database
// const testInsert = new ShopModel({
//     productTitle: 'Woven Issue Four',
//     productPrice: {
//         regularPrice: 20,
//     },
//     productAboutInfo: 'Issue 4 explores the paradoxes at play in our world: death and rebirth, old and new, past and future. We take on a mindset of endless growth and the many catalysts we encounter in the creative process: setbacks, loss, imagination, and serendipity. From poetry to plants, this issue looks intently into the face of the immeasurable forces that propel us forward, and meditates on our role in designing the future. From Manly, Australia to Victoria, British Columbia, from Long Beach, California to Jersey City, New Jersey, we share the stories of nine artists, designers, and entrepreneurs who are holding the tension between the past, present, and future. You’ll meet modern day poet Joekenneth Museau who channelled the loss of his mother to cancer into a guidebook for grief, Julianne Ahn who took up ceramics as a meditation, and photographer Cody Cobb whose solo expeditions take us back in time. We study the cosmology of city planning at Arcosanti, an experimental architecture site in the Arizona desert, and glimpse the mythical symbols of Antelope Canyon through the eyes of Navajo guides.',
//     productSpecs : '144 pages, offset-printed and perfect bound, full color on uncoated and coated paper. Printed in Germany. Dimensions: 8.5 x 11.3 in'
// });


// testInsert.save()
// .then( ( resolve ) => {
//     console.log("successfully pushed to database");
//     console.log(resolve);
// })






// ROUTE SETTING
require('./src/routes/shopRoute');
// its like copy and paste 