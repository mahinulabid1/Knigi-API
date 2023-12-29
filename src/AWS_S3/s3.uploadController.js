require('module-alias/register')
const { s3 } = require('@awsS3/AWS.config.js');
const generateUniqueKey = require('@additionalFunction/generateUniqueKey.js');

const s3FileUpload = (image, uploadDestination) => {
   return new Promise((resolve, reject) => {
      const uniqueKey = generateUniqueKey();

      s3.putObject({
         Body: image,
         Key: `${uploadDestination}/${uniqueKey}.jpg`,  // do not start with "/", it will create a file with name "/"
         Bucket: 'knigiimagedb',
         ACL: "public-read",  // it is needed so that it can be accessed by public by default.

      }, (err) => {
         if (err) {
            console.log(err);
            reject(err);
         } else {
            console.log(`File upload Successful`);
            const fileName = `${uniqueKey}.jpg`;
            resolve(fileName);
         }
      });
   })

}

module.exports = s3FileUpload;