const db = require('./dbConnection')
const classes = require('extends-classes');


class getNotif extends classes (db) {

    constructor (){
        super();
    }

    async getnotif (friend_id, res) {
        console.log(friend_id)
        await this.getnotifi(friend_id, res)
    }

}

module.exports = getNotif;