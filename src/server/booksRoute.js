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


function getMatchHashFromDir(src) {
    let hashMap = {};
    for (f of fs.readdirSync(src)) {
        if (f === ".DS_Store") {
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

router.get("/:bookid/:volume/:arc", (req, res) => { // getting single book
    res.sendFile(path.join(__dirname, "..", "private", "book", "book.html"));
});

router.post("/:bookid/:volume/:arc", (req, res) => {
    let bookid = String(req.params.bookid);
    let vol = String(req.params.volume);
    let arc = String(req.params.arc);

    let txtFilePath = path.join(bookDir, bookid);
    let maxVol = numberVol(txtFilePath);
    txtFilePath = path.join(txtFilePath, getMatchHashFromDir(txtFilePath)[vol])
    let maxArcs = numberVol(txtFilePath);
    arc = arc < maxArcs ? arc : maxArcs; // No bigger than max arc
    txtFilePath = path.join(txtFilePath, getMatchHashFromDir(txtFilePath)[arc])
    fs.readFile

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

router.post("/:bookid/volumes", (req, res) => {
    let bookid = String(req.params.bookid);
    let bookPath = path.join(bookDir, bookid);
    let bookStruct = {};

    glob(path.join(bookPath, "/*/*")).then(files => { 
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
            "volumes" : bookStruct
        })
    });


})


// router.post("", (req, res) => {
//     let authorName;
//     let bookLanguage;
//     let bookName;
//     let arcs;
//     let genres;

// });


module.exports = router;