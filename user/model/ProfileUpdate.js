const db = require('./dbConnection')
const validater = require('./InputValidator')
class ProfileUpdate extends db, validater {

    constructor (){
        super();
    }

    getInfo () {

    }

    getEmail () {

    }

    async updateInfo (user) {
        let result = true;
        let err = [];
        if (result && !(result = this.checkInput(user.gender))){
            err.push({gender: "gender must not be empty"});
        }
        if (result  && !(result = this.checkInput(user.boi))){
            err.push({boi: "boi must not be empty"})
        }
        if (result && !(this.checkObject(user.interest))){
            err.push({interest: "interests must not be empty"})
        }
        if (result && err == ''){
            if (!(result = await this.updateProfile(user))){
                err.push({update: "update faild"})
            }
        }
        return {result, err}
    }

    async updateEmail (user) {

        if (await this.checkemails(user.email)){
            if (await this.updateEmail(user)){
                return 1;
            }
        }
        return 0;
    }

    async updatePassword (user) {
        if (await this.updatePassword(user.password))
            return 1;
        return 0;
    }

}

module.exports = ProfileUpdate;