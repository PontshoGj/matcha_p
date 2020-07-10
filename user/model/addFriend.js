const db = require('./dbConnection')
const classes = require('extends-classes');


class addFriend extends classes (db) {

    constructor (){
        super();
    }

    async friend (user, frnd, res) {
        await this.addFriend(user, frnd, res)
    }

}

module.exports = addFriend;