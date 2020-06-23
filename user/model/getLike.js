const db = require('./dbConnection')
const classes = require('extends-classes');


class getLike extends classes (db) {

    constructor (){
        super();
    }

    async like (user, frnd, res) {
        await this.insertLike(user, frnd, res)
    }

}

module.exports = getLike;