const { app } = require("../../index");
const { newUser, getUserInfo } = require("../controller/userController");

app
    .post("/api/v1/user/newUser", async (req, res) => {
        try{
            let data = req.body;
            await newUser(data);
            res.status(200).send("Log: new user created");
        }
        catch ( err ) {
            console.log( err );
        }
        
    })


app
    .get("/api/v1/user", async ( req, res ) => {
        let id = req.query.id;
        let data = await getUserInfo( id );
        res.status(200).send(data);
    })

app
    .patch( "/api/v1/user" , ( req, res ) => {
        const id = req.query.id; 
    })