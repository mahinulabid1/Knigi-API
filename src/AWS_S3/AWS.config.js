const { S3 } = require('@aws-sdk/client-s3');

// initialize s3
const s3 = new S3 ( {
  credentials: {
      accessKeyId: 'AKIAUYPP6YV4XQS665GF',
      secretAccessKey: '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'
  },

  region : 'ap-south-1'
} );

module.exports = { s3 }; 
