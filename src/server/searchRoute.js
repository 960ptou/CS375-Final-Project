const pg = require("pg");
const express = require("express");
const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);

const router = express.Router();
const searchUtils = require("./searchUtils");
const cred = require(__dirname + "/credientialRoute");

// U can only get non-private book
router.get("/",  (req, res)=> {
    // https://www.freecodecamp.org/news/fuzzy-string-matching-with-postgresql/
    // PLEASE MAKE SURE THAT THE SERVER HAS EXTENSION INSTALLED
    let search = req.query.queryString;

    if (search === "main"){
        guessSearchQuery = "select * from book where is_private = false";
    }else if (searchUtils.isSearchByGenre(search)){
        guessSearchQuery = "select * from book where is_private = false and bookid in (select bookid from book_genre where genre = $1)";
    }else if (searchUtils.isSearchById(search)){
        guessSearchQuery = "select * from book where bookid = $1 and is_private = false";
    } else{ // the idea is that a author will unlikely to have a same name as book... fuzzy search.
        guessSearchQuery = "select * from book where (similarity(bookname,$1) > 0.4 or similarity(author,$1) > 0.4) and is_private = false";
    }

    if (search){
        pool.query(
            guessSearchQuery,
            search !== "main" ? [search] : [] 
        ).then((result) => {
            return res.status(200).json({books : result.rows});
        }).catch((error) => {
            console.log(error);
            return res.status(500).send("Query Error");
        });
    } else {
        return res.status(400).send("Invalid search");
    }
});


router.get("/private", cred.authSession, cred.requireLogin , (req, res)=> {
    // https://www.freecodecamp.org/news/fuzzy-string-matching-with-postgresql/
    // PLEASE MAKE SURE THAT THE SERVER HAS EXTENSION INSTALLED
    let search = req.query.queryString;
    let uid = res.locals.userid;

    if (search === "private"){
        guessSearchQuery = "select * from book where is_private = true and bookid in (select bookid from ownby where userid = $1)";
    }else if (search === "mybooks"){
        guessSearchQuery = "select * from book where bookid in (select bookid from ownby where userid = $1)"
    }else if (searchUtils.isSearchByGenre(search)){
        guessSearchQuery = "select * from book where is_private = true and bookid in (select bookid from book_genre where genre = $2) and bookid in (select bookid from ownby where userid = $1)";
    }else if (searchUtils.isSearchById(search)){
        guessSearchQuery = "select * from book where bookid = $2 and is_private = true and bookid in (select bookid from ownby where userid = $1)";
    } else{ // the idea is that a author will unlikely to have a same name as book... fuzzy search.
        guessSearchQuery = "select * from book where (similarity(bookname,$2) > 0.4 or similarity(author,$1) > 0.4) and is_private = true and bookid in (select bookid from ownby where userid = $1)";
    }

    if (search){
        pool.query(
            guessSearchQuery,
            search !== "private" && search !== "mybooks" ?  [uid,search]  :[uid]
        ).then((result) => {
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