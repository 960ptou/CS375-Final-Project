const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

class passwordUtils{
    constructor(){
    }

    hashPass(pass){
        bcrypt.hashSync(pass, 10) // just for testing now
        .then((hashedPass) => {
            return hashedPass;
        }).catch((error) =>{
            console.log(new Error(error));
            return null;
        })
    }

    comparePass(pass, dbHashPass){
        bcrypt.compare(pass, dbHashPass)
        .then((passwordMatched) => {
            if (passwordMatched) {
                return true;
            } else {
                return false;
            }
        }).catch((error) => {// bcrypt crashed
            console.log(new Error(error));
            return null;
        });
    }

    randNumID(){
        return Math.floor(Math.random() * Date.now()); // double randomness
    }

    validUsername(rawUser){
        return rawUser.length>= 8 && rawUser.length <= 16;
    }

    validUserpass(rawPass){
        return rawPass.length>=5 && rawPass.length <= 16;
    }

    sessionCookie(){ //https://dev.to/rahmanfadhil/how-to-generate-unique-id-in-javascript-1b13
        return uuidv4();
    }
};

module.exports.passwordUtils = new passwordUtils();