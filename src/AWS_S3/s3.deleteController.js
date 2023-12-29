const { s3 } = require( '@awsS3/AWS.config.js' );

const s3FileDelete = (path) => {
   return new Promise( ( resolve, reject ) =>{

      s3.deleteObject({
         Key: path,
         Bucket: 'knigiimagedb',
      }, (err) => {
         if ( err ) {
            reject(err);
            console.log( err );
         }
         else {
            console.log( 'File deleted successfully!' );
            resolve( "Log: Image deleted sucessfully!" );
         }
      })

   })
   
}


module.exports = { s3FileDelete };