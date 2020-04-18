const db = require('./dbConnection')
const validater = require('./InputValidator')

class ProfileUpdate extends db, validater {

    constructor (){
        super();
    }

    async updateInfo (user) {
        let result = true;
        let err = [];
        if (result && !(result = this.checkInput(user.firstname))){
            err.push({firstname: 'firstname must not be empty'})
        }
        if (result && !(result = this.checkInput(user.lastname))){
            err.push({lastname: 'lastname must not be empty'})
        }
        if (result && !(result = this.checkInput(user.gender))){
            err.push({gender: "gender must not be empty"});
        }
        if (result  && !(result = this.checkInput(user.boi))){
            err.push({boi: "boi must not be empty"})
        }
        if (result && !(this.checkObject(user.interest))){
            err.push({interest: "interests must be atleast three"})
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
                return {result: 1, err: ''};
            }
        }
        return {result: 0, err: 'email exist'};
    }

    async updatePassword (user) {
        if (await this.updatePassword(user))
            return 1;
        return 0;
    }

    async updateUsername (user) {
        if (await this.checkusernames(user.username)){
            if (await this.updateUsername(user))
                return 1;
        }
        return 0;
    }
}

module.exports = ProfileUpdate;