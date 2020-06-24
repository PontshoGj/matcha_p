const db = require('./dbConnection')
const validater = require('./InputValidator')
const classes = require('extends-classes');


class getFriends extends classes (db, validater) {

    constructor (){
        super();
    }

    async getfriends (user_id, res) {
            await this.Friends(user_id, res)
    }
}

module.exports = getFriends;