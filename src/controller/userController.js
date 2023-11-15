// this is where I'll do database operation
const userModel = require("../model/userModel");

const newUser = async ( data ) => {

    try {
        const insertData = new userModel( data );
        await insertData.save( );
    }
    catch ( err ) {
        console.log( err );
    }
    
}

const getUserInfo = async ( id ) => {

    try { 
        let data = await userModel.findById( id );
        return data;
    }

    catch ( err ) {
        console.log( err );
    }

}


const  updateUser = async ( id , data , option ) => {

    try{
        if ( option === undefined ) {
            option = null;
        }

        await userModel.findByIdAndUpdate(id, data, option);
    }

    catch ( err ) {
        console.log(err);
    }
}

module.exports = { newUser, getUserInfo, updateUser }