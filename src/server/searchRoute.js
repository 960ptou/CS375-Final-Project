const pg = require("pg");
const express = require("express");
const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);

const router = express.Router();
const searchUtils = require("./searchUtils");


router.post("/",  (req, res)=> {
    let search = req.body.search;
    let guessSearchQuery;

    if (searchUtils.isSearchByGenre(search)){
        guessSearchQuery = "select bookid from book_genre where genre = $1";
    }else if (searchUtils.isSearchById(search)){
        guessSearchQuery = "select bookid from book where bookid = $1";
    } else{
        guessSearchQuery = "select bookid from book where bookname like $1%"
    }


    if (search){
        pool.query(
            "SELECT bookname FROM book WHERE search = $1",
            [search]
        ).then((result) => {
            console.log(result.rows);
            return res.status(200).send();
        }
        ).catch((error) => {
            console.log(error);
            return res.status(500).send("Book not found");
        });
    } else {
        return res.status(400).send("Invalid search");
    }
});





module.exports = router;