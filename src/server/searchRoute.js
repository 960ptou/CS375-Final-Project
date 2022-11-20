const pg = require("pg");
const express = require("express");
const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);

const router = express.Router();
const searchUtils = require("./searchUtils");

// U can only get non-private book
router.get("/",  (req, res)=> {
    // https://www.freecodecamp.org/news/fuzzy-string-matching-with-postgresql/
    // PLEASE MAKE SURE THAT THE SERVER HAS EXTENSION INSTALLED
    let search = req.query.queryString;

    if (search === "main"){
        guessSearchQuery = "select bookid, bookname,book_language from book where is_private = false";
    }else if (searchUtils.isSearchByGenre(search)){
        guessSearchQuery = "select bookid, bookname,book_language from book where is_private = false and bookid in (select bookid from book_genre where genre = $1)";
    }else if (searchUtils.isSearchById(search)){
        guessSearchQuery = "select bookid, bookname,book_language from book where bookid = $1 and is_private = false";
    } else{ // the idea is that a author will unlikely to have a same name as book... fuzzy search.
        guessSearchQuery = "select bookid, bookname,book_language from book where (similarity(bookname,$1) > 0.4 or similarity(author,$1) > 0.4) and is_private = false";
    }

    if (search){
        pool.query(
            guessSearchQuery,
            search !== "main" ? [search] : [] 
        ).then((result) => {
            console.log(result.rows);
            return res.status(200).json({books : result.rows});
        }).catch((error) => {
            console.log(error);
            return res.status(500).send("Query Error");
        });
    } else {
        return res.status(400).send("Invalid search");
    }
});


module.exports = router;