// this is where I'll do database operation
const userModel = require("../model/userModel");

class NewUser {

    constructor() {

    }

    async create(JSONdata) {
        let data = JSON.parse(JSONdata);
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
        console.log(`Data fetching complete. Time took: ${this.executionDuration}`);
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
        x === undefined || null ? console.info ( `Updated Successfully (${this.executionDuration}ms)` ) : console.info( 'upload failed' );
    }
}




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

module.exports = { FetchUser ,NewUser, UpdateUser, newUser, getUserInfo, updateUser }