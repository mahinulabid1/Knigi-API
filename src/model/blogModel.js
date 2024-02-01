const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
   author : {
      type: String,
      required: [true, 'Author is missing!']  // fixed data, won't take input from client, if client tries to change it-- send error
   },
   subject : {
      type: String,
      required : [true, 'Article subject is missing!']
   },
   articleTitle : {
      type: String,
      required: [true, 'Article title is missing!']
   },
   articleData : {
      type: String,
      required: [true, 'Article data is missing!']
   },
   articleImageCollection : {
      type: Object,
      required : [true, 'article image collection is missing!']
   },
   articlePublishedDate : {
      type : String,
      required : [true, 'article date is mising'] // fixed data, won't take input from client, if client tries to change it-- send error
   },
   articleEditDate : {
      type : Object  // fixed data, won't take input from client, if client tries to change it-- send error
   }
},
{
   collection: 'BlogDB'
}
)

const BlogModel = new mongoose.model('blogmodel', Schema);
module.exports = BlogModel;