const db = require('./dbConnection')
const validater = require('./InputValidator')
const classes = require('extends-classes');


class Passwordrest extends classes (db, validater) {

    constructor (){
        super();
    }

    async passwordreset (email, res) {
        await this.updatePassword2(email, res)
    }
}

module.exports = Passwordrest;