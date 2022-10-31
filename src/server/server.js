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
const pwutil = userCred.userUtil;

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

app.post("/signup", (req, res) => {
    let username = req.body.username;
    let plaintextPassword = req.body.plaintextPassword;

    if (!username || 
        !plaintextPassword ||
        typeof username !== 'string' ||
        typeof plaintextPassword !== 'string' ||
        username.length === 0 || 
        username.length > 25 ||
        plaintextPassword.length < 5 ||
        plaintextPassword.length > 36
        )
    {
        // Fails filters
        return res.status(401).send();
    }

    // check if exist user return.
    pool.query("SELECT hashed_password FROM users WHERE username = $1", [
        username,
    ]).then((result) => {
        if (result.rows.length !== 0) {
            // username exists
            return res.status(401).send();
        }
    });

    bcrypt
        .hash(plaintextPassword, saltRounds)
        .then((hashedPassword) => {
            pool.query(
                "INSERT INTO users (username, hashed_password) VALUES ($1, $2)",
                [username, hashedPassword]
            )
                .then(() => {
                    // account created
                    console.log(username, "account created");
                    res.status(200).send();
                })
                .catch((error) => {
                    // insert failed
                    console.log(error);
                    res.status(500).send();
                });
        })
        .catch((error) => {
            // bcrypt crashed
            console.log(error);
            res.status(500).send();
        });
});


app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});
