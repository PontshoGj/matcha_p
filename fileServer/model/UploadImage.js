const db = require('./dbConnection')
//class that validates the user input during registration
class UploadImage extends db {

    constructor (userid, imagelocation){
        super();
        this.userid = userid
        this.imagelocation = imagelocation
    }

    async Uploadimage () {
        let result;
        if ((result = await this.insertImage({userid: this.userid, imageloaction: this.imagelocation}))){
            return ({result})
        }else{
            return ({result})
        }
        
    }
}
module.exports = UploadImage;