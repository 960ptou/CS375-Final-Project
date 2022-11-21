const pg = require("pg");
const express = require("express");
const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);
const fs = require("fs");
const path = require('path'); 
const fileUpload = require('express-fileupload');

const router = express.Router();
router.use(fileUpload());
// https://stackoverflow.com/questions/23691194/node-express-file-upload

router.post("/upload", (req, res) =>{
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let files = req.files;
    console.log(files);
    res.send();
    
})

// router.post("/delete", (req, res) =>{
    
// })






module.exports = router;