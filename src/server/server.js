const pg = require("pg");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const port = 3000;
const hostname = "localhost";
const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);


// https://www.youtube.com/watch?v=0Hu27PoloYw
pool.connect().then(function () {
    console.log(`Connected to database ${env.database}`);
});

app.use(express.static( __dirname + "/../public/login"));
app.use(express.static(__dirname + "/../public/signup"));
app.use(express.static(__dirname + "/../public/home"));
app.use(express.static(__dirname + "/../public/profile"));
app.use(express.static(__dirname + "/../public/upload"));


app.use(express.json());
app.use(cookieParser());

const credRoute = require(__dirname + "/credientialRoute");
const bookRoute = require(__dirname + "/booksRoute");
const searchRoute = require(__dirname + "/searchRoute");
app.use("/cred", credRoute);
app.use("/book", bookRoute);
app.use("/search", searchRoute);


const BAD_REQUEST = 400;
const SUCCESS = 200;
const SERVER_ERROR = 500;


app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});
