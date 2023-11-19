const { generateUniqueKey, s3 } = require ( '../../index' ); 

// function: takes an image array buffer and return Blog URL
const BlogUrlGenerator = async ( ArrayBufferOfImage ) => {
    // Assuming you have a buffer called 'imageBuffer'
    const imageBuffer = ArrayBufferOfImage// Your Node.js buffer containing the image data

    // Convert the buffer to a Base64-encoded string
    const base64Image = Buffer.from(imageBuffer).toString('base64');

    // Create a data URL
    const imageUrl = `data:image/jpeg;base64,${base64Image}`;

    console.log(imageUrl);

    return  imageUrl;
} 


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
    
    const imageData = await a;              // returns array buffer of the image
    const BlogUrl = BlogUrlGenerator(imageData);
    return BlogUrl;
}


module.exports = { imageInput, readImage }