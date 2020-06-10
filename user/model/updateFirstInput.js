const db = require('./dbConnection')
const validater = require('./InputValidator')
const classes = require('extends-classes');


class updatefirstInput extends classes (db) {

    constructor (){
        super();
    }

    async updatefirstinput (username, res) {
        let users;
        if (await this.checkusernames(username)){
            if ((users = await this.UpdateFirstInput(username, res))){
                return 1;
            }
        }else {
            return 0
        }
    }

}

module.exports = updatefirstInput;