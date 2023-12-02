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
        console.log(`Here is the secret key: ${secret_key} \n`);
        const token = jwt.sign( { user }, secret_key, { expiresIn : '20m' } );
        return token;
    }

    async verify( req ) {

        return new Promise( ( resolve, reject ) => {
            let token = req.headers['authorization'];
            const secret_key = process.env.SECRET_KEY;
            jwt.verify(token, secret_key, (err, decoded) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }

                resolve(decoded);
            });

        } )
        
 
    }
}


// Takes password string as argument, returns encrypted password
class Hashing {
    async encrypt( password ) {
        let execStart= Date.now();
        let x = await bcrypt.genSalt(10);
        let encryptedPass = await bcrypt.hash(password, x);  // using bcrypt library
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
        console.log(username)
        let result = await userModel.find( { userName : username } );
        return result;
    }

    async byId ( id ) {
        let result = await userModel.find( { _id : id } );
        return result;
    }
}


class UpdateUser {
    constructor () {
        this.executionDuration = undefined;
    }

    async dbOperation ( operationType, parameterObject ) {
        let operationResult;
        let { id, data, option, username } = parameterObject;
        option === undefined ? option = null : option = option;
        const execStart = Date.now();
        if( operationType ===  'byId' ) {
            operationResult = await userModel.findByIdAndUpdate( id , data, option ); 
        } 
        else if( operationType === 'byUserName' ) {
            operationResult = await userModel.findOneAndUpdate( { userName: username } , data, option);
        }

        this.executionDuration = Date.now() - execStart;
        operationResult !== undefined || null ? console.info ( `Updated Successfully (${this.executionDuration}ms)` ) : console.info( 'Update failed' );
    }

    // update user information using by ID
    async byId( id , data , option ) {
        //validation
        if( id === undefined || data === undefined ) {
            console.log( `Incorrect Parameter, class UpdateUser.byID\n Aborting Operation` );
            return ;
        }

        this.dbOperation( 'byId', { id, data,option } )
    }


    // update user information by username
    async byUserName( username , data , option ) {
        // validation
        if( username === undefined || data === undefined ) {
            console.log( `Incorrect Parameter, class UpdateUser.byID\n Aborting Operation` );
            return ;
        }

        this.dbOperation( 'byUserName', { username, data, option } );
    }
}


class DeleteUser {
    constructor() {
        this.executionDuration = undefined;
    }

    async byId( id ) {
        console.log("starting operation");
        await userModel.deleteOne({ _id : id });
        return "Successfully Deleted";      // validation missing: what if deleteOne failed?
    }

    async byUserName (username) {
        console.log("starting operation");
        await userModel.deleteOne({ userName : username });
        return "Successfully Deleted";      // validation missing: what if deleteOne failed?
    }
}



module.exports = { FetchUser ,NewUser, UpdateUser, DeleteUser, Hashing, UserValidation, JWT }