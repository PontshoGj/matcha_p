
//class that validates the user input during registration
class Validater {

    constructor (firstname, lastname,username, password, email){
        this.firstname = firstname
        this.lastname = lastname
        this.username = username
        this.password = password
        this.email = email
    }
    
    //check if the first name is not empty
    checkfirst = () => {
        if (this.firstname === '' || this.firstname === null)
            return 0;
        return 1;
    }
    //check if the last name is not empty
    checklast = () => {
        if (this.lastname === '' || this.lastname === null)
            return 0;
        return 1;
    }

    //checking if the username is empty and does not match any username on the database
    checkusername = async () => {
        if (this.username === '' || this.username === null)
            return 0;
        return 1;
    }

    //checking if the password meets the requirement and its not empty
    checkpassword = () => {
        let patt = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        if (this.password.length > 7)
        {
            if (!patt.test(this.password))
                return 0;
            return 1;
        }
        return 0;
    }

    //checking if the input is an email and that it does not match any on the database
    checkemail = async () => {
        let patt = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/;
        if (this.email !== '' || this.email !== null)
        {
            if (patt.test(this.email))
            {
                return 1;
            }
        }else
            return 0;
    }

    //checking if the required fields are correct before storing then to the database
    checkreg = async () => {
        let err = [];
        let result = true
        if (!(result = this.checkfirst())){
            err.push({firstname: "first incorrect"});
        }
        if (!(result = this.checklast())){
            err.push({lastname: "last name incorrect"});
        }
        if (!(result = await this.checkemail())){
            err.push({email: "email already exist"})
        }
        if (!(result = await this.checkusername())){
            err.push({username: "username already exist"})
        }
        if (!(result = this.checkpassword())){
            err.push({password: "password incorrect"});
        }
        return {result, err};
    }
}

module.exports = Validater