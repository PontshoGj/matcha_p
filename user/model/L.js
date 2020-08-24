const db = require('./dbConnection')
const classes = require('extends-classes');


class L extends classes (db) {

    constructor (){
        super();
    }

    async likes (user, frnd, res) {
        await this.insertLike(user, frnd, res)
    }

    async dislikes (user, frnd, res) {
        await this.insertdisLike(user, frnd, res)
    }

    async dislikes2 (user, frnd, res) {
        await this.insertdisLike2(user, frnd, res)
    }

    async dele (user, frnd, res) {
        await this.delefri(user, frnd, res)
    }

    async getnotif (friend_id, res) {
        console.log(friend_id)
        await this.getnotif(friend_id, res)
    }

}

module.exports = L;