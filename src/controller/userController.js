// this is where I'll do database operation
const userModel = require("../model/userModel");
const {bcrypt, dotenv} =require('../../index');
const { 
    mongoose, 
    generateUniqueKey, 
    s3, 
    app, 
    cloudFrontUrl ,
    jwt
} = require ( '../../index' );

dotenv.config();


class JWT {
    
    constructor ( username, fullname ) {
        this.username = username;
        this.fullname = fullname;
    }

    create ( ) {  
            
        // never stores password or sensitive info here.
        const user = {
            username : this.username,
            fullname : this.fullname
        }  
 
        const secret_key = process.env.SECRET_KEY;
        const token = jwt.sign( { user }, secret_key, { expiresIn : '4m' } );
        return token;
    }

    async verifyy( secret_key, token ) {
        
        jwt.verify(token, secret_key, (err, decoded) => {
            if (err) {
                console.log(err)
            }
            // Verification logic
            // GOAL: use a promise to return the "decoded" from verifyy function
            console.log(decoded);
        });
 
    }
}


// Takes password string as argument, returns encrypted password
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

// initial user authentication. compare client's passwords with database password
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

    // find user by username
    async userName ( username ) {
        let result = await userModel.find( { userName : username } );
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



module.exports = { FetchUser ,NewUser, UpdateUser, DeleteUser, Hashing, UserValidation, JWT }