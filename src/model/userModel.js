const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: [true, 'First name is not found in the user data!']
   },

   lastName: {
      type: String,
      required: [true, 'Last name is not found in the user data!']
   },

   email: {
      type: String,
      unique: true,
      required: [true, 'Email is not found in the user data!'] 
   },

   birthdate: {
      type: Date,
      required: [true, 'Birthdate is not found in the user data!']  
   },

   username: {
      type: String,
      required: [true, 'Username is not found in the user data!'],
      unique: true // this unique not working. According to some web forum, this could be an issue of mongoose itself. It existed in older version.
   },

   gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Gender is not found in the user data!']
   },

   password: {
      type: String,
      required: [true, 'Password is not found in the user data!']
   },
   imageData : {
      imageName: {
         type: String,
         default: "No Image Uploaded",
      },
      imageLink: {
         type: String,
         default: "image link not specified!"
      },
      publicId : {
         type: String,
         default: 'publicId is not defined!'
      }
      
   },
   userRole : {
      type: String,
      enum : ['author', 'user'],
      required: [true, 'User role not found!']
   }
},

{
   collection: 'userDB' // Collection name
});

const UserModel = mongoose.model("userModel", UserSchema);

module.exports = UserModel;
