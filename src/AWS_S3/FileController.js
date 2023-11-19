const { generateUniqueKey, s3 } = require ( '../../index' ); 


// function : uploads image to the AWS S3 bucket
const imageInput = async ( imageData ) => {

    try{
        const uniqueKey = generateUniqueKey();

        s3.putObject({
            Body: imageData,
            Key : `shopItem/${uniqueKey}.jpg`,
            Bucket: 'knigiimagedb',
            ACL: "public-read",
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




module.exports = { imageInput }