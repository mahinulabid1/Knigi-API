const {mongoose} = require("../../index");

// const UserSchema = new mongoose.Schema(
//     {
//         firstName: {
//             type : String,
//             required: true
//         },

//         lastName : {
//             type: String,
//             required: true
//         },

//         email : {
//             type : String,
//             required : true
//         },

//         birthDate: {
//             day : {
//                 type: Number,
//                 required: true
//             },
//             month : {
//                 type : Number,
//                 required: true
//             },
//             year : {
//                 type: Number,
//                 required : true
//             }
//         },

//         userName : {
//             type: String,
//             unique: true,
//             required: true
//         },

//         gender : {
//             type: String,
//             required: true
//         },

//         password : {
//             type : String,
//             required : true
//         }
//     },

//     {
//         collection : 'userDB' // Collection name
//     }
// );

const UserSchema = new mongoose.Schema(
    {
        fullName : {
            type :String,
            required : [true, 'fullName is missing. Operation Aborted']
        },
        userName : {
            type : String,
            required : [true, "username is required creating new user. Operation is aborted"],
            // unique: true  // will be creating custom validator 
        },
        password : {
            type : String,
            required : [true, "password is required creating new user"],
        }
    },
    {
        collection: "userDB"
    }

)

const userModel = new mongoose.model("userModel", UserSchema);

module.exports = userModel;