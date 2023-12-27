const { 
    app,
    upload,
    } = require('../../index');


const { 
    NewUser,
    FetchUser,
    UpdateUser,
    DeleteUser,
    Hashing,
    UserValidation,
    JWT,
    UniqueUser
    } = require( '../controller/userController');


const { ExecutionDuration, Debugging } = require( '../../debug' );


// debugging
const executionDuration = new ExecutionDuration( );
const debug = new Debugging( );

// create new user
app.post('/api/v1/user/newUser', upload.array( ), async ( req, res ) => {
    executionDuration.monitorBegin( );                      // debugging
    const hashing = new Hashing( );
    let data = JSON.parse( req.body.data );   // coming from form data

    //user input validation
    let isValid = debug.fieldInputValidation([data.userName, data.password, data.fullName]);
    if (isValid === false ) {
        res.send("Data missing. Request can not be completed");
    }

    // unique user validation
    const uniqueUser = new UniqueUser(data.userName);
    const isUnique = await uniqueUser.verify();
    
    if( isUnique === 'unique' ) {
        let encryptPass = await hashing.encrypt ( data.password );
        data.password = encryptPass;
        const newUser = new NewUser( data );
        await newUser.create ( ); 
        const ExecTime = executionDuration.monitorEnd();    // debugging
        res.status ( 200 )
        .send( `Log: new user created \n Total Time took ${ExecTime}ms`); 
    }
    else {
        const ExecTime = executionDuration.monitorEnd();    // debugging
        res.status(400).send(`The username is not Unique. Try with Another Username \n Took time: ${ExecTime}ms`)
    }
     
})


// user login function
app.post( '/api/v1/user/login', upload.array ( ), async ( req, res ) => {
    const fetchUser = new FetchUser( );
    const userValidation = new UserValidation( );

    let token;
    executionDuration.monitorBegin( );                      // debugging
    const clientInput = JSON.parse ( req.body.data );
    const username = clientInput.userName;
    const password = clientInput.password;
    username === undefined || password === undefined ? res.send("[Blank] username, password") : console.log("Received Input");

    let data = await fetchUser.userName( username );
    if (data.length === 0) {       // is there any data with this username?
        return res.status(400).json({ error: "This username doesn't exist" });
    }

    const fullName = data[0].fullName; 

    let valid = await userValidation.check( password, data[0].password );       // returns password match: true/false [using: bcrypt library]
    if ( valid === true ) {
        // create JWT
        const jwt = new JWT ( username, fullName );
        token = jwt.create ( );
        
        res.cookie( 'userName', data[ 0 ].userName , {
            maxAge : 1000 * 60 , //one minute
            httpOnly : true ,
            secure : true
        });
        res.cookie('fullName', data[0].fullName, { 
            maxAge : 1000 * 60, //one minute
            httpOnly : true,
            secure : true
        });
        res.cookie( 'id', data[ 0 ]._id, {
            maxAge : 1000 * 60, //one minute
            httpOnly : true,
            secure : true
        });
        const ExecTime = executionDuration.monitorEnd( ); 
        const response = {
            passVerification : `Pass Matched? : ${valid}, Execution Time:${ExecTime}ms`,
            JWT : token
        }
        // debugging
        res.status( 200 ).json( response ); 
    }


    // Debugging 
    // debug.console(
    //     {
    //         Route: '/api/v1/user/login',
    //         UserInputUsername: data,
    //         UserInputPassword: password
    //     }
    // )
    
})





// fetch single user by JWT
app.get ( '/api/v1/user', async ( req, res ) => { 
    try {
        const fetchUser = new FetchUser();
        const jwt = new JWT ( );
        const tokendata = await jwt.verify ( req )
        // let id = req.query.id;       // don't need query.id since the use of JWT has user related information
        let data = await fetchUser.userName ( tokendata.user.username ); 
        data.length === 0 ? res.status(400).send("Username not found.") : console.log("Username found in database.") ;
        res.status ( 200 ).send ( data );
    }catch (err) {
        if(err) {
            res.send(err);
        }
    }
    
})



// update single user data by ID
app.patch( '/api/v1/user' , upload.array ( ), async ( req, res ) => {
    const updateUser = new UpdateUser ( );
    const jwt = new JWT ( );
    try{
        const tokendata = await jwt.verify ( req )      // i can create method where jwt.username will give me just username, jwt.fullname will give me just full name, more clean code
        const data = JSON.parse ( req.body.data );
        const userName = tokendata.user.username
        updateUser.byUserName( userName, data );
        res.status ( 200 ).send ( 'Update Complete' );
    } catch ( err ) {
        res.send(err);
    }
})


// Perform: delete operation using user's ID
app.delete('/api/v1/user/delete', async ( req, res ) => {
    try{
        const deleteUser = new DeleteUser ( );
        const jwt = new JWT ( );
        const tokendata = await jwt.verify ( req ) 
        let result = await deleteUser.byUserName( tokendata.user.username );
        res.status(200).send(result);
    }catch( err ) {
        res.send(err);
    }
    
})

// [dev purpose only], bcrypt functionalities check
app.get('/api/v1/crpttest',async ( req, res ) => {
    const hashing = new Hashing();
    await hashing.encrypt('hello');
    res.send('done');
})  


// fetch all users (for dev purpose )
app.get ( '/api/v1/user/allUser', async ( req, res ) =>{
    const fetchUser = new FetchUser ( );
    let data = await fetchUser.all ( );
    res.status ( 200 ).contentType ( 'application/json' ).send ( data );
})


// app.get('/verify',async ( req,res ) => {
//     const jwt = new JWT();
//     await jwt.verify('lpjzw2if-axbcced6k5-3vukldiq95', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoia2F0Mjg4ODg0IiwiZnVsbG5hbWUiOiJLYXQgV2lsbGlzIn0sImlhdCI6MTcwMTI3NjE0NCwiZXhwIjoxNzAxMjc2NDQ0fQ.z81lNdh7207U6KwgNTUEA3DpHWEX2Eaut_41Giu2E4A')
//     res.end();
// })


app.get('/test', (req, res) =>{ 
    const val = new UniqueUser("hello99");
    val.verify();
    res.send("done");
})