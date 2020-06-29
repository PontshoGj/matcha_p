const db = require('./dbConnection')
// const classes = require('extends-classes');


class getMatch extends db {

    constructor (){
        super();
    }

    async getmatch (interest, longitude, latidute, minage, maxage, gender, res) {
        await this.getMatch(interest, longitude, latidute, minage, maxage, gender,res)
    }
}

module.exports = getMatch;