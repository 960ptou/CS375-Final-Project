const { v4: uuidv4 } = require('uuid');

class passwordUtils{


    constructor(min = 4, max = 16){
        this.userMinLen = min;
        this.userMaxLen = max;
    }

    randNumID(){
        let ran = Math.random();
        return Math.floor((ran ? ran : 1)  * Date.now()); // double randomness
    }

    validUsername(rawUser){
        return rawUser.length >= this.userMinLen && rawUser.length <= this.userMaxLen;
    }

    validUserpass(rawPass){
        return rawPass.length >= this.userMinLen && rawPass.length <= this.userMaxLen;
    }

    sessionCookie(){ //https://dev.to/rahmanfadhil/how-to-generate-unique-id-in-javascript-1b13
        return uuidv4();
    }

    minutesFromNow(minutes){
        let now = new Date();
        let resultTime = now.getTime();
        resultTime += minutes * 1000 * 60; // js format
        now.setTime(resultTime);
        return now;
    }

    hoursFromNow(hours){
        return this.minutesFromNow(60 * hours); 
    }

    daysFromNow(days){
        return this.hoursFromNow(24 * days);
    }
};

module.exports.passwordUtils = new passwordUtils();