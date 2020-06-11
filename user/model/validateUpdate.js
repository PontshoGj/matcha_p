const db = require('./dbConnection')

class ValidateUpdate extends db {

    constructor (age, firstname, interest, lastname, username, gender){
        super();
        this.age = age;
        this.firstname = firstname;
        this.interest = interest;
        this.lastname = lastname;
        this.username = username;
        this.gender = gender
    }

    checkage () {
        if (NaN(this.age))
            return 0;
        return 1;
    }

    checkInterest () {
        if (this.interest == '' && this.interest.length >= 3)
            return 0;
        return 1;
    }

    checkBoi () {
        if (this.bio === ''){
            return 0
        }
        return 1;
    }

    checkgender () {
        let gender = ['Bisexuelle', 'lesbian', 'gay', 'female', 'male', 'select'];
        if (this.gender === '' || gender === null)
            return 0;
        else{
            if (gender[this.gender] === null)
                return 0;
        }
        return 1;
    }

    async updateInfo (res) {
        let err = []
        let result = true
        if (result && !(result = this.checkage)){
            err.push({age: "you must have a list"})
        }
        if (result && !(result = this.checkInterest)){
            err.push({interest: "you must have minimum of 3 interest"})
        }
        if (result && !(result = this.checkBoi)){
            err.push({bio: 'you must have a boi'})
        }
        if (result && !(result = this.checkgender())){
            this.gender = 'Bisexuelle'
        }
        // console.log(err)
        if (result && err == ''){
            let users = {
                age: `${this.age}`,
                firstname: `${this.firstname}`,
                interest: `${this.interest}`,
                lastname: `${this.lastname}`,
                username: `${this.username}`,
                gender: `${this.gender}`
            }
            await this.addmoredetails(users, res)
        }
        return {result, err};
    }
}
module.exports = ValidateUpdate;