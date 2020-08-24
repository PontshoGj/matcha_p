const db = require('./dbConnection')
const classes = require('extends-classes');


class getMessage extends classes (db) {

    constructor (){
        super();
    }

    async getmessage (friend_id, user_id,res) {
        console.log(friend_id)
        await this.getmes(friend_id, user_id,res)
    }

}

module.exports = getMessage;