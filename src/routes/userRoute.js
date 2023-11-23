const { 
    app,
    upload} = require("../../index");
const { 
    NewUser,
    FetchUser,
    // newUser, 
    getUserInfo, 
    updateUser } = require("../controller/userController");
const newUser = new NewUser();
const fetchUser = new FetchUser();


app.post("/api/v1/user/newUser", upload.array(), async (req, res) => {
    // try{
    //     let data = req.body.data;
    //     await newUser(data);
    //     res.status(200).send("Log: new user created");
    // }
    // catch ( err ) {
    //     console.log( err );
    // }
    let status = await newUser.create(req.body.data);
    console.log(status);
    res.status(200).send("Log: new user created");
    
})

// fetch single user by ID
app.get("/api/v1/user", async ( req, res ) => {
    let id = req.query.id;
    let data = await getUserInfo( id );
    res.status(200).send(data);
})

app.get("/api/v1/user/allUser",async ( req, res ) =>{
    let data = await fetchUser.all();
    res.status(200).contentType("application/json").send(data);
})

app.patch( "/api/v1/user" , async ( req, res ) => {
    const id = req.query.id; 
    const data = req.body;
    try{
        let a = await updateUser(id, data);
        console.log(a);
        res.status(200).send(`User Updated `);
    }
    catch ( err ) {
        console.log( err );
    }
})