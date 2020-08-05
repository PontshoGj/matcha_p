const db = require('./dbConnection')
const classes = require('extends-classes');


class saveLocation extends classes (db) {

    constructor (){
        super();
    }

    async saveLoc (lat, lng, user_id,res) {
        await this.saveloc(lat, lng, user_id,res)
    }

    async getLoc (userid,res) {
        await this.getloc(userid, res)
    }

    async updateLoc (userid, lat, lng, res){
        await this.updateloc(userid, lat, lng, res)
    }
}

module.exports = saveLocation;