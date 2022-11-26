const pg = require("pg");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");


const port = 3000;
const hostname =  "192.168.0.103"//"localhost";
const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);


// https://www.youtube.com/watch?v=0Hu27PoloYw
pool.connect().then(function () {
    console.log(`Connected to database ${env.database}`);
});



app.use(express.json());
app.use(cookieParser());


const cred = require(__dirname + "/credientialRoute");
const bookRoute = require(__dirname + "/booksRoute");
const searchRoute = require(__dirname + "/searchRoute");
const fileTransRoute = require(__dirname +"/fileTransferRoute")


app.use(express.static( __dirname + "/../public/login"));
app.use(express.static(__dirname + "/../public/signup"));
app.use(express.static(__dirname + "/../public/home"));
app.get("/profile.html", cred.authSession, cred.requireLogin ,(req, res) =>{
    res.sendFile(path.join(__dirname, "..", "public", "profile", "profile.html"));
})
app.get("/upload.html", cred.authSession, cred.requireLogin ,(req, res) =>{
    res.sendFile(path.join(__dirname, "..", "public", "upload", "upload.html"));
})


app.use(express.static(__dirname + "/../public/profile"));
app.use(express.static(__dirname + "/../public/upload"));

app.use("/cred", cred.credRoute);
app.use("/book", bookRoute);
app.use("/search", searchRoute);
app.use("/file", fileTransRoute);

const BAD_REQUEST = 400;
const SUCCESS = 200;
const SERVER_ERROR = 500;


app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});
