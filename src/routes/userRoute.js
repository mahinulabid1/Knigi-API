const { 
    app,
    upload,
    } = require("../../index");


const { 
    NewUser,
    FetchUser,
    UpdateUser,
    DeleteUser,
    Hashing,
    UserValidation,
    JWT
    } = require("../controller/userController");


const { ExecutionDuration, Debugging } = require('../../debug');
// instantiation
// const newUser = new NewUser();
// const fetchUser = new FetchUser();
// const updateUser = new UpdateUser();
// const deleteUser = new DeleteUser();
// const hashing = new Hashing();
// const userValidation = new UserValidation();

// debugging
const executionDuration = new ExecutionDuration();
const debug = new Debugging();

// create new user
app.post("/api/v1/user/newUser", upload.array(), async (req, res) => {
    executionDuration.begin();                      // debugging
    const newUser = new NewUser();
    const hashing = new Hashing();

    let data = JSON.parse(req.body.data);   // coming from form data
    let encryptPass = await hashing.encrypt ( data.password );
    data.password = encryptPass;
    await newUser.create ( data ); 
    const ExecTime = executionDuration.finish();    // debugging
    res.status ( 200 )
    .send( `Log: new user created \n Total Time took ${ExecTime}ms`);  
})


// user login function
app.post("/api/v1/user/login", upload.array(), async ( req, res ) => {
    const fetchUser = new FetchUser();
    const userValidation = new UserValidation();

    let token;
    executionDuration.begin();                      // debugging
    
    const clientInput = JSON.parse(req.body.data);
    const username = clientInput.userName;
    const password = clientInput.password;

    let data = await fetchUser.userName( username );
    const fullName = data[0].fullName;

    let valid = await userValidation.check( password, data[0].password );       // returns password match: true/false [using: bcrypt library]
    if ( valid === true ) {
        // create JWT
        const jwt = new JWT(username, fullName);
        token = jwt.create();
        
        res.cookie('userName', data[0].userName, {
            maxAge : 1000 * 60, //one minute
            httpOnly: true,
            secure: true
        });
        res.cookie('fullName', data[0].fullName, {
            maxAge : 1000 * 60, //one minute
            httpOnly: true,
            secure: true
        });
        res.cookie('id', data[0]._id, {
            maxAge : 1000 * 60, //one minute
            httpOnly: true,
            secure: true
        });
        const ExecTime = executionDuration.finish(); 
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
    //         Route: "/api/v1/user/login",
    //         UserInputUsername: data,
    //         UserInputPassword: password
    //     }
    // )
    
})





// fetch single user by JWT
app.get ("/api/v1/user", async ( req, res ) => { 
    const fetchUser = new FetchUser();
    const jwt = new JWT();
    const tokendata = await jwt.verify ( req )
    // let id = req.query.id;       // don't need query.id since the use of JWT has user related information
    let data = await fetchUser.userName ( tokendata.user.username ); 
    res.status ( 200 ).send ( data );

})



// update single user data by ID
app.patch( "/api/v1/user" , upload.array(), async ( req, res ) => {
    const updateUser = new UpdateUser();
    const jwt = new JWT();
    const tokendata = await jwt.verify ( req )      // i can create method where jwt.username will give me just username, jwt.fullname will give me just full name, more clean code
    const data = JSON.parse(req.body.data);
    const userName = tokendata.user.username
    updateUser.byUserName( userName, data );
    res.status(200).send("Update Complete");
})

// Perform: delete operation using user's ID
app.delete("/api/v1/user/delete", async ( req, res ) => {
    const deleteUser = new DeleteUser();
    const jwt = new JWT();
    const tokendata = await jwt.verify ( req ) 
    let result = await deleteUser.byUserName( tokendata.user.username );
    res.status(200).send(result);
})

// [dev purpose only], bcrypt functionalities check
app.get('/api/v1/crpttest',async ( req, res ) => {
    const hashing = new Hashing();
    await hashing.encrypt('hello');
    res.send("done");
})  


// fetch all users (for dev purpose )
app.get ( "/api/v1/user/allUser", async ( req, res ) =>{
    const fetchUser = new FetchUser ( );
    let data = await fetchUser.all ( );
    res.status ( 200 ).contentType ( "application/json" ).send ( data );
})


// app.get("/verify",async ( req,res ) => {
//     const jwt = new JWT();
//     await jwt.verify("lpjzw2if-axbcced6k5-3vukldiq95", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoia2F0Mjg4ODg0IiwiZnVsbG5hbWUiOiJLYXQgV2lsbGlzIn0sImlhdCI6MTcwMTI3NjE0NCwiZXhwIjoxNzAxMjc2NDQ0fQ.z81lNdh7207U6KwgNTUEA3DpHWEX2Eaut_41Giu2E4A")
//     res.end();
// })