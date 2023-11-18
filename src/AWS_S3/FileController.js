const { generateUniqueKey, s3 } = require ( '../../index' ); 

// function : uploads image to the AWS S3 bucket
const imageInput = async ( imageData ) => {

    try{
        const uniqueKey = generateUniqueKey();

        s3.putObject({
            Body: imageData,
            Key : `shopItem/${uniqueKey}.jpg`,
            Bucket: 'knigiimagedb'
        }, 
        (err, data) => {
            if(err) {
                console.log(err);
            }
            else{
                console.log("image uploaded successfully ");
            }
        })

        return uniqueKey;
    } 
    
    catch ( err ) {
        console.log( err ) ;
    }
}


const readImage = async ( filename ) => {

    /* Resons for using Promise: 
    - getObject use callback function to maintain its async function. 
    - I can't "await" a callback function. It doesn't work.
    - Because of this limitations I couldn't return the image that I got from S3
    - So I created a Promise, that allowed me to use await
    - 
    */
    let a = new Promise ( (resolve, reject ) => {

        s3.getObject( {

            Bucket : "knigiimagedb",
            Key : `shopItem/${filename}`

        } , 
        
        ( err, result ) => {

            if( err ) {
                reject( err );
            } else { 
                resolve ( result.Body ); 
            }

        })
    })
    
    const imageData = await a;
    return imageData;
}


module.exports = { imageInput, readImage }