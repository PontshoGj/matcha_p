const db = require('./dbConnection')
const classes = require('extends-classes');


class L extends classes (db) {

    constructor (){
        super();
    }

    async likes (user, frnd, res) {
        await this.insertLike(user, frnd, res)
    }

    async dislikes (user, frnd, res) {
        await this.insertdisLike(user, frnd, res)
    }
}

module.exports = L;