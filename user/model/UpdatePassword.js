const db = require('./dbConnection')
const validater = require('./InputValidator')
const classes = require('extends-classes');


class UpdatePassword extends classes (db, validater) {

    constructor (){
        super();
    }

    async UpdatePassword (user) {
        if (await this.updatePassword(user))
            return 1;
        return 0;
    }


}

module.exports = UpdatePassword;