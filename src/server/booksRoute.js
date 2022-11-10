const pg = require("pg");
const express = require("express");
const fs = require("fs");
const path = require("path");
const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);
const router = express.Router();


function getMatchHashFromDir(src){
    let hashMap = {};

    for(f of fs.readdirSync(src)){
        if(f === ".DS_Store"){
            continue;
        }
        hashMap[f.match(/\d+/)[0]] = f;
    }
    return hashMap;
}

function numberVol(path){
    let dirInfo = fs.readdirSync(path);
    let dirLeng = dirInfo.length;
    if (dirInfo.includes(".DS_Store")){
        dirLeng --;
    }
    return dirLeng;
}


const bookDir = path.join(process.cwd(), "books"); // running directory

router.get("/:bookid/:volume/books.css", (req, res)=>{ // getting single book
    res.sendFile( path.join(__dirname, "..", "public", "books", "books.css") );
});

router.get("/:bookid/:volume/books.js", (req, res)=>{ // getting single book
    res.sendFile( path.join(__dirname, "..", "public", "books", "books.js") );
});

router.get("/:bookid/:volume/:arc", (req, res)=>{ // getting single book
    res.sendFile( path.join(__dirname, "..", "public", "books", "books.html") );
});

router.post("/:bookid/:volume/:arc", (req, res) =>{
    let bookid = String(req.params.bookid);
    let vol = String(req.params.volume);
    let arc = String(req.params.arc);


    let txtFilePath = path.join(bookDir, bookid);
    let maxVol = numberVol(txtFilePath);
    txtFilePath = path.join(txtFilePath, getMatchHashFromDir(txtFilePath)[vol])
    let maxArcs = numberVol(txtFilePath);
    arc = arc < maxArcs ? arc : maxArcs; // No bigger than max arc
    txtFilePath = path.join(txtFilePath, getMatchHashFromDir(txtFilePath)[arc])


    fs.readFile(txtFilePath,"utf8", (err, data) =>{
        if (err){
            console.log(err);
            res.status(400).json({error : "Book not found"});
        }else{
            res.status(200).json({
                    bookid : bookid,
                    volume : vol,
                    maxVol : maxVol,
                    arc : arc,
                    maxArcs : maxArcs,
                    title: txtFilePath.substring(txtFilePath.lastIndexOf("/") + 1),
                    text : data,
                });
        }
    })
})


// router.post("", (req, res) => {
//     let authorName;
//     let bookLanguage;
//     let bookName;
//     let arcs;
//     let genres;

// });


module.exports = router;