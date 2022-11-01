const pg = require("pg");
const express = require("express");
const app = express();
//https://stackoverflow.com/questions/44816519/how-to-get-cookie-value-in-expressjs
const cookieParser = require("cookie-parser");

const port = 3000;
const hostname = "localhost";
const env = require("../env.json");

const Pool = pg.Pool;
const pool = new Pool(env);
const userCred = require(__dirname + "/userCred");
const pwutil = userCred.passwordUtils;

pool.connect().then(function () {
    console.log(`Connected to database ${env.database}`);
});

app.use(express.static( __dirname + "/../public/login"));
app.use(express.static(__dirname + "/../public/signup"));
app.use(express.json());
app.use(cookieParser());


const BAD_REQUEST = 400;
const SUCCESS = 200;
const SERVER_ERROR = 500;

let sessionCookies = {
    // cookieId : userid -> for storing login
}

app.post("/signup", (req, res) => {
    let username = String(req.body.username);
    let userpass = String(req.body.userpass);

    if(!pwutil.validUsername(username)){
        return res.status(401).json({"error" : "Invalid Username : 8-16 characters"});
    }

    if (!pwutil.validUserpass(userpass)){
        return res.status(401).json({"error" : "Invalid Password : 5-16 characters"});
    }
    
    // check if exist user return.
    pool.query("SELECT userid FROM users WHERE username = $1", [username])
    .then((result) => {
        if (result.rows.length !== 0) { // exists
            return res.status(401).json({"error" : "Username Exist"});
        }
    });

    let hashPass = pwutil.hashPass(userpass);
    let userId = pwutil.randNumID();

    pool.query(
        "INSERT INTO users (userid, username, hashpass) VALUES ($1, $2, $3)",
        [userId, username, hashPass]
    ).then(() =>{
        res.status(SUCCESS).send();
    }).catch((error)=>{
        console.log(new Error(error));
        res.status(SERVER_ERROR).json({"error": "Server DB error"});
    })
});


app.post("/login", (req, res) =>{
    let username = String(req.body.username);
    let userpass = String(req.body.userpass);

    pool.query("SELECT hashpass,userid FROM users WHERE username = $1", [username])
    .then((result) => {
        if (result.rows.length === 0) { // exists
            return res.status(401).json({"error" : "Username Doesn't exist"});
        }

        let hashedPass = result.rows[0].hashpass;
        let userid = result.rows[0].userid;
        let match = pwutil.comparePass(userpass, hashedPass);

        if (match){
            let sessionCookie = pwutil.sessionCookie();
            sessionCookies[sessionCookie] = userid;
            return res.status(SUCCESS).header("set-cookie", sessionCookie).send();
        }else{
            return res.status(400).json({"error" : "Wrong password"});
        }
    });
});


app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});
