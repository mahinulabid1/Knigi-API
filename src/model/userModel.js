const {mongoose} = require("../../index");

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type : String,
            required: true
        },

        lastName : {
            type: String,
            required: true
        },

        email : {
            type : String,
            required : true
        },

        birthDate: {
            day : {
                type: Number,
                required: true
            },
            month : {
                type : Number,
                required: true
            },
            year : {
                type: Number,
                required : true
            }
        },

        userName : {
            type: String,
            unique: true,
            required: true
        },

        gender : {
            type: String,
            required: true
        },

        password : {
            type : String,
            required : true
        }
    },

    {
        collection : 'UserDB' // Collection name
    }
);

const userModel = new mongoose.model("userModel", UserSchema);

module.exports = userModel;