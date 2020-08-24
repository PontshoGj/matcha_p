const db = require('./dbConnection')
const validater = require('./InputValidator')
const classes = require('extends-classes');


class Ban extends classes (db, validater) {

    constructor (){
        super();
    }

    async getBan (res) {
        await this.Bann(res)
    }
}

module.exports = Ban;