const db = require('./dbConnection')
const validater = require('./InputValidator')
const classes = require('extends-classes');


class getBio extends classes (db, validater) {

    constructor (){
        super();
    }

    async getBio (username, res) {
        let user;
        if (this.checkInput(username)){
            if ((user = await this.getbio(username, res))){
                return user;
            }
        }
        return 0;
    }

    async updateBio (user, res) {
        let users;
        if (this.checkInput(user.username) && this.checkInput(user.bio)){
            if ((users = await this.UpdateBio(user, res))){
                return {bio: users};
            }else {
                return {bio: "bio exist"}
            }
        }
        return {email: "bio not updated"};
    }

}

module.exports = getBio;