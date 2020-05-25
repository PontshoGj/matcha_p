const db = require('./dbConnection')

class ValidateUpdate extends db {

    constructor (age, race, interest, bio, username, gender){
        super();
        this.age = age;
        this.race = race;
        this.interest = interest;
        this.bio = bio;
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

    async updateInfo () {
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
                race: `${this.race}`,
                interest: `${this.interest}`,
                bio: `${this.bio}`,
                username: `${this.username}`,
                gender: `${this.gender}`
            }
            if (!(result = await this.addmoredetails(users))){
                err.push({insert: "insertion faild"})
            }
        }
        return {result, err};
    }
}
module.exports = ValidateUpdate;