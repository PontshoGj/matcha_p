const db = require('./dbConnection')
// const classes = require('extends-classes');


class getMatch extends db {

    constructor (){
        super();
    }

    async getmatch (interest, longitude, latidute, res) {
        await this.getMatch(interest, longitude, latidute, res)
    }
}

module.exports = getMatch;