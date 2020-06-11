const db = require('./dbConnection')
const validater = require('./InputValidator')
const classes = require('extends-classes');


class UpdatePassword extends classes (db, validater) {

    constructor (){
        super();
    }

    async UpdatePassword (user, res) {
        await this.updatePassword(user, res)
    }


}

module.exports = UpdatePassword;