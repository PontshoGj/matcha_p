const db = require('./dbConnection')
//class that validates the user input during registration
class UploadImage extends db {

    constructor (userid, images){
        super();
        this.userid = userid
        this.image = images
    }

    async Uploadimage () {
        let result;
        console.log(this.image)
        if ((result = await this.insertImage({userid: this.userid, images: this.image}))){
            return ({result})
        }else{
            return ({result})
        }
        
    }
    async getimage () {
        let result;
        console.log(this.userid)
        if ((result = await this.getImage({userid: this.userid}))){
            return ({result})
        }else{
            return ({result})
        }
        
    }
}
module.exports = UploadImage;