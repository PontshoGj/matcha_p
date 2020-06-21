const db = require('./dbConnection')


class getMatch extends db {

    constructor (){
        super();
    }

    async getmatch (user_id, res) {
        await this.getMatcha(user_id, res)
    }
}

module.exports = getMatch;