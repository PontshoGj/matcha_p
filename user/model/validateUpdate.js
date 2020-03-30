const db = require('./dbConnection')

class ValidateUpdate extends db {
    constructor (age, race, interest, boi, username){
        super();
        this.age = age;
        this.race = race;
        this.interest = interest;
        this.boi = boi;
        this.username = username;
    }

    checkage = () => {
        if (NaN(this.age))
            return 0;
        return 1;
    }

    checkInterest = () => {
        if (this.interest == '' && this.interest.length >= 3)
            return 0;
        return 1;
    }

    checkBoi = () => {
        if (this.boi === '')
            return 0
        return 1;
    }

    updateInfo = async () => {
        let err = []
        let result = true
        if (result && !(resut = this.checkage)){
            err.push({age: "you must have a list"})
        }
        if (result && !(result = this.checkInterest)){
            err.push({interest: "you must have minimum of 3 interest"})
        }
        if (result && !(result = this.checkBoi)){
            err.push({boi: 'you must have a boi'})
        }
        if (result && err == ''){
            let users = {
                username = `${this.username}`,
                age = `${this.age}`,
                race = `${this.race}`,
                interest = `${this.interest}`,
                boi = `${this.boi}`
            }
            if (!(result = await this.updateInfo)){
                err.push({insert: "insertion faild"})
            }
        }
        return {result, err};
    }
}
module.exports = ValidateUpdate;