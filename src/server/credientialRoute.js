const pg = require("pg");
const express = require("express");
//https://stackoverflow.com/questions/44816519/how-to-get-cookie-value-in-expressjs
const bcrypt = require("bcrypt");
const env = require("../env.json");

const Pool = pg.Pool;
const pool = new Pool(env);
const userCred = require(__dirname + "/userCred");
const pwutil = userCred.passwordUtils ;
const router = express.Router();


const BAD_REQUEST = 400;
const SUCCESS = 200;
const SERVER_ERROR = 500;
const saltRounds = 3;

let sessionCookies = {
    // cookieId : userid -> for storing login
}

router.post("/signup", (req, res) => {
    let username = req.body.username ? String(req.body.username) : ""; // valid input not null
    let userpass = req.body.userpass ? String(req.body.userpass) : ""; 

    if(!pwutil.validUsername(username)){
        return res.status(401).json({"error" : "Invalid Username : 4-16 characters"});
    }

    if (!pwutil.validUserpass(userpass)){
        return res.status(401).json({"error" : "Invalid Password : 4-16 characters"});
    }

    // check if exist user return.
    pool.query(
        "SELECT userid FROM users WHERE username = $1", [
            username
    ]).then((result) => {
        if (result.rows.length !== 0) { // exists
            return res.status(401).json({"error" : "Username Exist"});
        }else{
            bcrypt.genSalt(saltRounds,(err, salt)=>{
                if (err){
                    return res.status(401).json({"error" : "Salt failed"});
                }else{
                    bcrypt// adding
                        .hash(userpass, salt)
                        .then((hashedPass) => {
                            let userId = pwutil.randNumID();
                            pool.query(
                                "INSERT INTO users (userid, username, hashpass) VALUES ($1, $2, $3)",
                                [userId, username, hashedPass]
                            ).then(()=>{
                                console.log(username , "account created");
                                return res.status(SUCCESS).send();
                            }).catch((error)=>{
                                console.log(error);
                                return res.status(SERVER_ERROR).json({"error": "Server DB error"});
                            })
                        }).catch((error) =>{
                            console.log(error);
                            return res.status(SERVER_ERROR).json({"error": "Server error"});;
                        })
                }
            })
        }
    });
});


router.post("/login", (req, res) =>{
    let username = String(req.body.username);
    let userpass = String(req.body.userpass);

    pool.query("SELECT hashpass,userid FROM users WHERE username = $1", [username])
    .then((result) => {
        if (result.rows.length === 0) { // not exist
            return res.status(401).json({"error" : "Username Doesn't exist"});
        }else{
            let hashedPass = result.rows[0].hashpass;
            let userid = result.rows[0].userid;

            bcrypt
            .compare(userpass, hashedPass)
            .then((passwordMatched) => {
                if (passwordMatched) {
                    let sessionCookie = pwutil.sessionCookie();
                    
                    sessionCookies[sessionCookie] = userid;
                    return res.status(SUCCESS).header({
                        "Set-Cookie": `sessionToken=${sessionCookie};expires=${pwutil.minutesFromNow(30).toUTCString()};Path=/;HttpOnly; SameSite=Strict`,
                    }).send();
                } else {
                    return res.status(400).json({"error" : "Wrong password"});
                }
            })
            .catch((error) => {// bcrypt crashed
                console.log(error);
                res.status(SERVER_ERROR).json({"error": "Server error"});
            });
        }
    });
});

router.get("/loggedin", token2id, (req,res) => {
    if (res.locals.userid){
        return res.send();
    }else{
        return res.status(400).send();
    }
});

router.get("/username", token2id, requireLogin, (req,res)=>{
    pool.query("select username from users where userid = $1", [res.locals.userid]).then(result =>{
        if (result.rows.length === 1){
            res.json({"username" : result.rows[0].username});
        }else{
            res.status(400).json({"error": "i don't event know this is possible"});
        }
    })
})

router.get("/logout",token2id, (req, res)=>{
    if (res.locals.userid){
        delete sessionCookies[req.cookies.sessionToken]
        return res.json({"message" : "logged out"})
    }else{
        return res.status(400).json({"error" : "didn't log in"})
    }
})

// https://stackoverflow.com/questions/18875292/passing-variables-to-the-next-middleware-using-next-in-express-js
function token2id(req, res, next){
    let session = req.cookies;
    let token = session.sessionToken;
    res.locals.userid = sessionCookies[token]
    next();
}

function requireLogin(req, res, next){ // please use this and the thing above TOGETHER
    if (!res.locals.userid){return res.redirect('/login.html');}
    next();
}

module.exports = {
    credRoute : router,
    authSession : token2id,
    requireLogin : requireLogin,
}