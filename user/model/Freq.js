const db = require('./dbConnection')
const validater = require('./InputValidator')
const classes = require('extends-classes');


class Freq extends classes (db, validater) {

    constructor (){
        super();
    }

    async getfr (user_id, res) {
            await this.Fri(user_id, res)
    }
}

module.exports = Freq;