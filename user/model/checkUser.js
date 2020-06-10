const db = require('./dbConnection')
const validater = require('./InputValidator')
const classes = require('extends-classes');

class checkUser extends classes (db, validater) {

    constructor (){
        super();
    }

    async checkuser (username, password, res) {
        let result = {}
        if (this.checkInput(username) && this.checkInput(password)){
            if (await (result = this.checkUserLogin(username, password, res)))
                return result;
        }
        return {result: 0};
    }
}

module.exports = checkUser;