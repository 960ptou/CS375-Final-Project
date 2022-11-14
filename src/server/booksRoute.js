const pg = require("pg");
const express = require("express");
const fs = require("fs");
const path = require("path");
const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);
const router = express.Router();

const bookDir = path.join(process.cwd(), "books"); // running directory

// async function parseBook(bookid){
//     let bookDir = {}
//     // https://stackoverflow.com/questions/40593875/using-filesystem-in-node-js-with-async-await
//     let volumes = await fs.promises.readdir(path.join(bookDir, bookid))
//     volumes.forEach(vol => {
//         bookDir[vol] = await fs.promises.readdir(path.join(bookDir, bookid, vol))
//     })
//     return bookDir;
// }

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

function parseFolder(folder){
    let dirs = fs.readdirSync(folder, "utf8");
    let bookStruct = {};
    dirs.forEach((dir) => {
        bookStruct[dir] = [];
        let files = fs.readdirSync(path.join(folder, dir), "utf8");
        files.forEach( (f) =>{
            bookStruct[dir].push(f);
        });
    })
    return bookStruct;
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
    let bookStruct = parseFolder(bookPath);
    return res.json({
        "bookid" : bookid,
        "volumes" : bookStruct
    })


    fs.readdir(bookPath, "utf8", (err, dirs) =>{
        if(err){
            console.log(err);
            return res.status(400).json({ error: "Book not found" });
        }else{
            let bookStruct = {};
            dirs.forEach((dir) => {
                bookStruct[dir] = [];
                fs.readdir(path.join(bookPath, dir), (er, files) =>{
                    if (er){
                        console.log(er);
                        return res.status(400).json({ error: "Error while parsing" });
                    }
                    files.forEach((f)=>{
                        bookStruct[dir].push(f);
                    })
                })
            })
            return res.json({
                "volumes" : bookStruct
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