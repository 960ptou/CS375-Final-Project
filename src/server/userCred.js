let bcrypt = require("bcrypt");

class passwordUtils{
    constructor(){}

    hashPass(pass, salt){
        bcrypt.hash(pass, salt)
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
        return 8 >= rawUser.length && 16 <= rawUser.length;
    }

    validUserpass(rawPass){
        return 5 >= rawPass.length && 16 <= rawPass.length;
    }
};

module.exports.passwordUtils = passwordUtils;