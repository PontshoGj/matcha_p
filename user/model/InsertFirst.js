const db = require('./dbConnection')

class InsertFirst extends db {

    constructor (age, race, interest, username, gender){
        super();
        this.age = age;
        this.race = race;
        this.interest = interest;
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

    async insertInfo () {
        let err = []
        let result = true
        if (result && !(result = this.checkage)){
            err.push({age: "you must have a list"})
        }
        if (result && !(result = this.checkInterest)){
            err.push({interest: "you must have minimum of 3 interest"})
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
                username: `${this.username}`,
                gender: `${this.gender}`
            }
            if (!(result = await this.insertFirst(users))){
                err.push({insert: "insertion faild"})
            }
        }
        return {result, err};
    }
}
module.exports = InsertFirst;