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
        return encryptedPass;
    }
    
}

class UserValidation {
    async check(password, databaseHashPass) {
        let res = await bcrypt.compare(password, databaseHashPass);
        return res;
    }
}


class NewUser {

    constructor( ) {

    }

    async create ( data ) {
        data = new userModel ( data );
        data.save ( );
        return "Data Upload Successful";
    }
}


class FetchUser {

    constructor ( ) {
        this.executionDuration = undefined;
    }

    // fetch all user, if limit (in number) is defined fetch within limitation[ex: ( 4 ), means fetch only four result ]
    async all ( limit ) {
        limit === undefined ? limit = null : limit = limit;
        const execStart = Date.now ();
        const data = await userModel.find ( { /* find all */ } ) .limit( limit );
        this.executionDuration = Date.now() - execStart;
        console.log(`Data fetching complete. Time took: ${this.executionDuration}ms`);
        return data;
    }   

    async userName ( username ) {
        console.log(username);
        let result = await userModel.find( { userName : username } );
        console.log(result);
        return result;
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



module.exports = { FetchUser ,NewUser, UpdateUser, DeleteUser, Hashing, UserValidation }