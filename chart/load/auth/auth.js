
class auth extends classes (db, validater) {

    constructor (){
        super();
    }

    async getUserInfo (username) {
        let user;
        if (this.checkInput(username)){
            if ((user = await this.auth(username))){
                return user;
            }
        }
        return 0;
    }
}

module.exports = auth;