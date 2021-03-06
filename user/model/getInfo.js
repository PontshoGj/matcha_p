const db = require('./dbConnection')
const validater = require('./InputValidator')
const classes = require('extends-classes');


class getInfo extends classes (db, validater) {

    constructor (){
        super();
    }

    async getUserInfo (username, res) {
        let user;
        if (this.checkInput(username)){
            if ((user = await this.getInfo(username, res))){
                return user;
            }
        }
        return 0;
    }
}

module.exports = getInfo;