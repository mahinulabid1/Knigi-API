// this is where I'll do database operation
const userModel = require("../model/userModel");
const {bcrypt} =require('../../index');

class Hashing {
    async encrypt( password ) {
        let execStart= Date.now();
        let x = await bcrypt.genSalt(10);
        let encryptedPass = await bcrypt.hash(password, x);
        let executionDuration = Date.now() - execStart;
        console.log(`\nTook Time : ${executionDuration}ms\n`);
        // console.log(encryptedPass);
        return encryptedPass;
    }

    validatePass (password) {

    }
    
}


class NewUser {

    constructor() {

    }

    async create(data) {
        // let data = JSON.parse(JSONdata);
        data = new userModel( data );
        data.save();
        return "Data Upload Successful";
    }
}


class FetchUser {
    constructor() {
        this.executionDuration = undefined;
    }
    async all(limit) {
        limit === undefined ? limit = null : limit = limit;
        const execStart = Date.now();
        const data = await userModel.find({ /* find all */ }).limit(limit);
        this.executionDuration = Date.now() - execStart;
        console.log(`Data fetching complete. Time took: ${this.executionDuration}ms`);
        return data;
    }   
}


class UpdateUser {
    constructor () {
        this.executionDuration = undefined;
    }

    async byId( id , data , option ) {
        // validation
        if(id === undefined) {
            console.log("ID is undefined at byId( id , data , option ) at userController.js");
            return;
        }
        else if( data === undefined ) {
            console.log("data is undefined at byId( id , data , option ) at userController.js");
            return;
        } else if(id === undefined && data === undefined ) {
            console.log("data and id are undefined at byId( id , data , option ) at userController.js");
            return;
        }


        option === undefined ? option = null : option = option;
        const execStart = Date.now();
        let x = await userModel.findByIdAndUpdate(id , data, option);
        this.executionDuration = Date.now() - execStart;
        x !== undefined || null ? console.info ( `Updated Successfully (${this.executionDuration}ms)` ) : console.info( 'Update failed' );
    }
}


class DeleteUser {
    constructor() {
        this.executionDuration = undefined;
    }

    async byId( id ) {
        console.log("starting operation");
        await userModel.deleteOne({ _id : id });
        return "Successfully Deleted";
    }
}



// const newUser = async ( data ) => {

//     try {
//         const insertData = new userModel( data );
//         await insertData.save( );
//     }
//     catch ( err ) {
//         console.log( err );
//     }
    
// }

// const getUserInfo = async ( id ) => {

//     try { 
//         let data = await userModel.findById( id );
//         return data;
//     }

//     catch ( err ) {
//         console.log( err );
//     }

// }


// const  updateUser = async ( id , data , option ) => {

//     try{
//         if ( option === undefined ) {
//             option = null;
//         }

//         await userModel.findByIdAndUpdate(id, data, option);
//     }

//     catch ( err ) {
//         console.log(err);
//     }
// }

module.exports = { FetchUser ,NewUser, UpdateUser, DeleteUser, Hashing }