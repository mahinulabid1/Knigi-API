const mongoose = require( 'mongoose' );
const url = "mongodb+srv://himahinulabid:DjYFI1UPxb5BRyJl@cluster0.kgeats8.mongodb.net/Knigi?retryWrites=true&w=majority";


const dbConnect = async () =>{
    try{
        mongoose.connect(
            url
            // the url parser is deprecated, not using it anymore
        );
    }
    catch(err){
        console.log(err)
    }
    
    
}

module.exports = dbConnect;