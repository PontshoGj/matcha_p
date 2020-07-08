const db = require('./dbConnection')
const validater = require('./InputValidator')
const classes = require('extends-classes');


class ValidateAccount extends classes (db, validater) {

    constructor (){
        super();
    }

    async validateAccount (token, selec, res) {
        await this.updateAccount(token, selec, res)
    }


}

module.exports = ValidateAccount;