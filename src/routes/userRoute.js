const { 
    app,
    upload} = require("../../index");

const { 
    NewUser,
    FetchUser,
    UpdateUser,
    DeleteUser,
    Hashing,
    UserValidation,
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



app.post("/api/v1/user/newUser", upload.array(), async (req, res) => {
    executionDuration.begin();                      // debugging
    const newUser = new NewUser();
    const hashing = new Hashing();
    let data = JSON.parse(req.body.data);   // coming from form data
    let encryptPass = await hashing.encrypt ( data.password );
    data.password = encryptPass;
    let status = await newUser.create ( data ); 
    const ExecTime = executionDuration.finish();    // debugging

    

    res.status ( 200 )
    .send( `Log: new user created \n Total Time took ${ExecTime}ms`);  
})

app.post("/api/v1/user/login", upload.array(), async ( req, res ) => {
    executionDuration.begin();                      // debugging
    const fetchUser = new FetchUser();
    const userValidation = new UserValidation();
    const clientInput = JSON.parse(req.body.data);
    const username = clientInput.userName;
    const password = clientInput.password;
    let data = await fetchUser.userName( username );
    let valid = await userValidation.check( password, data[0].password );
    const ExecTime = executionDuration.finish();    // debugging

    // Debugging 
    debug.console(
        {
            Route: "/api/v1/user/login",
            UserInputUsername: data,
            UserInputPassword: password
        }
    )

    res.status( 200 ).contentType( "application/json" )
    .send( `Pass Matched? : ${valid} \nExecution Time:${ExecTime}ms` );
})

// fetch single user by ID
app.get("/api/v1/user", async ( req, res ) => {
    let id = req.query.id;
    let data = await getUserInfo( id );
    res.status( 200 ).send( data );
})

app.get("/api/v1/user/allUser",async ( req, res ) =>{
    const fetchUser = new FetchUser();
    let data = await fetchUser.all();
    res.status(200).contentType("application/json").send(data);
})

app.patch( "/api/v1/user" , upload.array(), async ( req, res ) => {
    const updateUser = new UpdateUser();
    const id = req.query.id; 
    const data = JSON.parse(req.body.data);
    updateUser.byId(id, data);
    res.status(200).send("Update Complete");
})

// Perform: delete operation using user's ID
app.delete("/api/v1/user/delete", async ( req, res ) => {
    const deleteUser = new DeleteUser();
    const id = req.query.id;
    console.log(id);
    let result = await deleteUser.byId( id );
    res.status(200).send(result);
})


app.get('/api/v1/crpttest',async ( req, res ) => {
    const hashing = new Hashing();
    await hashing.encrypt('hello');
    res.send("done");
})  