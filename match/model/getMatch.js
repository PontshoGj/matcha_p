const db = require('./dbConnection')
// const classes = require('extends-classes');


class getMatch extends db {

    constructor (){
        super();
    }

    async getmatch (interest, longitude, latidute, minage, maxage, gender, distance, user_id,res) {
        await this.getMatch(interest, longitude, latidute, minage, maxage, gender, distance, user_id,res)
    }
}

module.exports = getMatch;