const db = require('./dbConnection')
// const classes = require('extends-classes');


class getBio extends db {

    constructor (){
        super();
    }

    async getmatch (interest, res) {
        await this.getMatch(interest, res)
    }
}

module.exports = getBio;