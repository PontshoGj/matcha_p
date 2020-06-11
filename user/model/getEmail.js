const db = require('./dbConnection')
const validater = require('./InputValidator')
const classes = require('extends-classes');


class getEmail extends classes (db, validater) {

    constructor (){
        super();
    }

    async getEmail (username, res) {
        let user;
        if (this.checkInput(username)){
            if ((user = await this.getemail(username, res))){
                return user;
            }
        }
        return 0;
    }

    async updateEmail (user, res) {
        let users;
        if (this.checkInput(user.username) && this.checkInput(user.email)){
            if (await this.checkemails(user.email)){
                if ((users = await this.UpdateEmail(user, res))){
                    return {email: users};
                }
            }else {
                return {email: "email exist"}
            }
        }
        return {email: "email not updated"};
    }

}

module.exports = getEmail;