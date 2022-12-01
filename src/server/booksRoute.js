const pg = require("pg");
const express = require("express");
const fs = require("fs");
const path = require("path");
const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);
const router = express.Router();
let glob = require("glob-promise");
const bookDir = path.join(process.cwd(), "books"); // running directory
const cred = require(__dirname + "/credientialRoute");


router.use(cred.authSession);
function getMatchHashFromDir(src) {
    let hashMap = {};
    for (f of fs.readdirSync(src)) {
        if (f === ".DS_Store" || f.includes("cover")) {
            continue;
        }
        hashMap[f.match(/\d+/)[0]] = f;
    }
    return hashMap;
}

function numberVol(path) {
    let dirInfo = fs.readdirSync(path);
    let dirLeng = dirInfo.length;
    if (dirInfo.includes(".DS_Store")) {
        dirLeng--;
    }
    return dirLeng;
}

router.get("/:bookid/volumes", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "private", "volume", "volume.html"));
});

router.get("/:bookid/volume.js", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "private", "volume", "volume.js"));
});

router.get("/:bookid/volume.css", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "private", "volume", "volume.css"));
});

router.get("/:bookid/:volume/book.css", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "private", "book", "book.css"));
});

router.get("/:bookid/:volume/book.js", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "private", "book", "book.js"));
});

router.get("/:bookid/:volume/uiStorage.js",(req, res) => {
    res.sendFile(path.join(__dirname, "..", "private", "book", "uiStorage.js"));
});

router.get("/:bookid/:volume/:arc", (req, res) => { // getting single book
    res.sendFile(path.join(__dirname, "..", "private", "book", "book.html"));
});


function privateSend(req, res, next){
    let bookId = req.params.bookid;
    let userId = res.locals.userid;
    pool.query("select * from book where bookid = $1", [bookId]).then((result)=>{
        if (result.rows[0].is_private){
            if(!userId){ // short gate
                return res.status(400).json({"error" : "you are not a user, can't access this private book"});
            }
            pool.query("select * from ownby where bookid = $1 and userid= $2", 
                [bookId, userId]
            ).then( result2 =>{
                if(result2.rows.length === 1){ // is the users book;
                    next();
                }else{
                    return res.status(400).json({"error" : "you don't own this private book"});
                }
            })
        }else{
            next();
        }
    })
}


router.post("/:bookid/:volume/:arc",privateSend, (req, res) => {
    let bookid = String(req.params.bookid);
    let vol = String(req.params.volume);
    let arc = String(req.params.arc);

    let txtFilePath = path.join(bookDir, bookid);
    let maxVol = numberVol(txtFilePath);
    txtFilePath = path.join(txtFilePath, getMatchHashFromDir(txtFilePath)[vol])
    let maxArcs = numberVol(txtFilePath);
    arc = arc < maxArcs ? arc : maxArcs; // No bigger than max arc
    txtFilePath = path.join(txtFilePath, getMatchHashFromDir(txtFilePath)[arc])

    fs.readFile(txtFilePath, "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: "Book not found" });
        } else {
            return res.status(200).json({
                bookid: bookid,
                volume: vol,
                maxVol: maxVol,
                arc: arc,
                maxArcs: maxArcs,
                title: txtFilePath.substring(txtFilePath.lastIndexOf("/") + 1),
                text: data,
            });
        }
    })
})

router.get("/:bookid/cover.png", privateSend, (req, res)=>{
    let bookid = String(req.params.bookid);
    let bookPath = path.join(bookDir, bookid);
    glob(path.join(bookPath, "cover.*")).then(files =>{
        if(files.length >= 1){
            return res.sendFile(files[0]);
        }else{
            return res.status(400).json({"error" : "file not found"});
        }
    })
})

router.post("/:bookid/volumes",privateSend, (req, res) => {
    let bookid = String(req.params.bookid);
    let bookPath = path.join(bookDir, bookid);
    let bookStruct = {};

    pool.query(
        "select * from book where bookid = $1",
        [bookid]
    ).then(result =>{
        if (result.rows.length === 0) { // 0 or 1
            return res.status(401).json({"error" : "Book not in db"});
        }else{
            glob(path.join(bookPath, "/*/*.txt")).then(files => { 
                files.forEach(file => { 
                    let filePath = file.split("/");
                    let [volume, chapter] = [filePath[filePath.length - 2], filePath[filePath.length - 1]];
                    if (bookStruct[volume]){
                        bookStruct[volume].push(chapter);
                    }else{
                        bookStruct[volume] = [];
                        bookStruct[volume].push(chapter);
                    }
                });
        
                return res.json({
                    "bookid" : bookid,
                    "volumes" : bookStruct,
                    "bookinfo" : result.rows[0]
                })
            });
        }
    })
})



module.exports = router;