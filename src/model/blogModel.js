const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
   author : {
      type: String,
      required: [true, 'Author is missing!']
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
      type : Date,
      required : [true, 'article date is mising']
   },
   articleEditDate : {
      type : Object
   }
},
{
   collection: 'BlogDB'
}
)

const BlogModel = new mongoose.model('blogmodel', Schema);
module.exports = BlogModel;