const pg = require("pg");
const express = require("express");
const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);
const fs = require("fs");
const path = require('path');

const format = require('pg-format');
const fileUpload = require('express-fileupload');
const cred = require(__dirname + "/credientialRoute");
const router = express.Router();

router.use(fileUpload());
router.use( cred.authSession ); // gives uid if logged in

const bookDir = path.join(process.cwd(), "books"); // running directory

// https://stackoverflow.com/questions/23691194/node-express-file-upload
router.post("/upload", (req, res) =>{
    let uid = res.locals.userid;
    // IMPORTANT remove this
    uid = 1;

    if (!uid){
        return res.status(400).json({"error": "not logged in"});
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({"error" : 'No files were uploaded'});
    }
    let info = JSON.parse(req.body.meta);
    

    let bookname = info.title
    let author = info.author
    let language = info.language
    let private = typeof info.private  === "boolean" ? info.private :  false; // default
    let gens = info.genres;

    if (gens.constructor !== Array || gens.length === 0){
        return res.status(400).json({"error": "geners invalid"});
    }
        
    gens = gens.slice(0,5); // max 5
    

    [bookname,author,language].forEach(ele =>{
        if (!ele){
            return res.status(400).json({"error" : "items required not complete"});
        }
    })
    
    // console.log([bookname,author,language,private,gens])
    
    let now = new Date().toISOString().slice(0, 19).replace('T', ' ');// https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
    pool.query(
        "insert into book(bookname, author, book_language, book_upload ,is_private) values($1, $2,$3,$4,$5) returning bookid",
        [
            bookname,
            author,
            language,
            now,
            private
        ]
    ).then(result =>{
        let bid = result.rows[0].bookid;
        
        genInsertQuery = "";
        // https://stackoverflow.com/questions/34990186/how-do-i-properly-insert-multiple-rows-into-pg-with-node-postgres
        
        let vals = gens.map(gen => [bid, gen])
        pool.query(format("insert into book_genre(bookid, genre) values %L", vals), []).catch(err => console.log(err)); // shouldn't fail for any reason
        pool.query("insert into ownby(bookid, userid) values($1,$2)", [bid, uid]).catch(err => console.log(err));

        let files = req.files;
        let fileDict = {
            // folder : filename
        };
        fs.mkdir(path.join(bookDir, String(bid)), err=>{
            if(err){
                console.log(err);
                return res.status(400).json({"error": "create failed"});
            }else{
                let bidFolder = path.join(bookDir, String(bid));
                Object.keys(files).forEach(pathname =>{
                    let split = pathname.split("/");
                    if (split[1].includes("cover")){
                        files[pathname].mv(path.join(bidFolder, split[1]))
                        return;
                    }

                    if (split.length !== 3 && !(split[1].includes("cover"))){
                        return; // invalid files -> keep structure
                    }
                    let fname = split[2];
                    let foldername = split[1];
                    if(fileDict[foldername]){
                        fileDict[foldername].push([fname, files[pathname].mv]);
                    }else{
                        fileDict[foldername] = [[fname, files[pathname].mv]];
                    }
                });

                let orderedFolders = naturalSort(Object.keys(fileDict));
                for(let i = 1; i <= orderedFolders.length; i++){
                    let folderpath = path.join(bidFolder, `${i}-${orderedFolders[i-1]}`)
                    fs.mkdir(folderpath, (err)=>{
                        if (!err){
                            let myfiles = fileDict[orderedFolders[i-1]];
                            let dic = {}
                            myfiles.forEach(myfile =>{
                                dic[myfile[0]] = myfile[1];
                            })
                            let sortedFiles = naturalSort(Object.keys(dic));
                            console.log(sortedFiles)
                            for(let j = 1; j <= sortedFiles.length; j++){
                                dic[sortedFiles[j-1]]( path.join(folderpath, `${j}-${sortedFiles[j-1]}`))
                            }
                        }
                    })
                }
                res.json({"message":"inserted"})

            }
        })  
    }).catch(err =>{
        console.log(err);
        return res.status(400).json({"error": "insert failed"});
    })
})

router.post("/delete", (req, res) =>{
    let uid = String(res.locals.userid);
    let bid = String(req.body.bookid);

    if (!uid){
        return res.status(400).json({"error": "not logged in"});
    }

    pool.query(
        "delete from book where bookid = (select bookid from ownby where bookid = $1 and userid = $2) and private = false"
        ).then(result =>{
            // deleting book from folder -> the hope is that they can't get through to here if bid is fake
            fs.rmdir(path.join(bookDir, bid),{recursive: true, force: true} ,error=>{
                if (error ){// I don't really care you actually removed the book, it will be removed in the db
                    console.log(error);
                }else{
                    console.log(bookDir, "->", bid, "was removed");
                }
            });
            res.json({"message" : `book id ${bid} was removed by you`});
        }).catch(err =>{
            console.log(err);
            res.status(400).json({"error": "book delete not successful"});
        })
})



router.get("/test", (req, res) =>{
    console.log(res.locals.userid, "hello");
    res.send();
})

router.post("/test", (req, res) =>{
    console.log(res.locals.userid);
    console.log(Object.keys(req.body.meta));

    Object.keys(req.files).forEach(f =>{
        console.log(f);
    })
    res.send();
})


function naturalSort(ary){
    // https://stackoverflow.com/questions/2802341/javascript-natural-sort-of-alphanumerical-strings
    let collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
    return ary.sort(collator.compare);
}


module.exports = router;