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
app.use(express.json());
app.use(cookieParser());

const credRoute = require(__dirname + "/credientialRoute");
app.use("/cred", credRoute);


const BAD_REQUEST = 400;
const SUCCESS = 200;
const SERVER_ERROR = 500;


app.post("/search",  (req, res)=> {
    let search = req.body.search;
    if ((search !== undefined) || (search !== "") ){
        // search
        pool.query(
            "SELECT bookname FROM book WHERE search = $1",[
                search]
        ).then((result) => {
            console.log(result.rows);
            return res.status(SUCCESS).send();
        }
        ).catch((error) => {
            console.log(error);
            return res.status(SERVER_ERROR).send("Book not found");
        });
        

    } else {
        return res.status(BAD_REQUEST).send("Invalid search");
    }


    });



app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});
