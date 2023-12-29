require('module-alias/register')
const generateUniqueKey  = require('@additionalFunction/generateUniqueKey.js');
const { s3 } = require('@awsS3/AWS.config.js'); 
const fs = require('fs');
const cloudFrontUrl = process.env.CLOUDFRONT_URL;
// console.log(cloudFrontUrl)

// function : uploads image to the AWS S3 bucket
class UploadFile {
  constructor() {
    this.executionTime = undefined;
  }

  image(filename, uploadDestination) {
    // input: filename sent by req.files, accepts = "string"
    const imageFile = fs.readFileSync(`${__dirname}/../../upload/${filename}`);
    const uniqueKey = generateUniqueKey();

    const uploadExecStart = Date.now();
    s3.putObject({

      Body: imageFile,
      Key: `${uploadDestination}/${uniqueKey}.jpg`,  // do not start with "/", it will create a file with name "/"
      Bucket: 'knigiimagedb',
      ACL: "public-read",

    }, (err) => {
      if (err) {
        console.log(err)
      } else {
        this.uploadStatus = "Log: S3 Image Upload Successfully completed.";
        const uploadExecEnd = Date.now();
        this.executionTime = uploadExecEnd - uploadExecStart;
        console.log(`File upload Successful. Time took: ${this.executionTime}ms`);
      }
    });

    const FileName = `${uniqueKey}.jpg`;
    return FileName;

  }


  runDebug() {

  }
}



class DeleteFile {
  constructor() {

  }

  image(imageUrl) {
    const path = imageUrl.replace('https://d19a566nyr3opx.cloudfront.net/', "");

    s3.deleteObject({
      Key: path,
      Bucket: 'knigiimagedb',
    }, (err) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log("Log: Image deleted successfully");
      }
    })
  }
}




const deleteImageFile = async (imageSource) => {      // imageSource must contain path to file, including filename

  try {
    s3.deleteObject({
      Key: imageSource,
      Bucket: 'knigiimagedb',
    },
      (err, data) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log("Log: Image deleted successfully");
        }
      })
  }

  catch (err) {
    console.log(err);
  }
}



const imageInput = async (imageData) => {

  try {
    const uniqueKey = generateUniqueKey();

    s3.putObject({
      Body: imageData,
      Key: `shopItem/${uniqueKey}.jpg`,  // do not start with "/", it will create a file with name "/"
      Bucket: 'knigiimagedb',
      ACL: "public-read",
    },
      (err, data) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log("image uploaded successfully ");
        }
      });



    return uniqueKey;
  }

  catch (err) {
    console.log(err);
  }
}



module.exports = { imageInput, deleteImageFile, UploadFile, DeleteFile }




