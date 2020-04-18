const db = require('./dbConnection')
const validater = require('./InputValidator')
const classes = require('extends-classes');

class checkUser extends classes (db, validater) {

    constructor (){
        super();
    }

    async checkuser (username, password) {

        if (this.checkInput(username) && this.checkInput(password)){
            if (await this.checkUserLogin(username, password))
                return 1;
        }
        return 0;
    }
}

module.exports = checkUser;