const db = require('./dbConnection')
//class that validates the user input during registration
class UploadImage extends db {

    constructor (userid, images){
        super();
        this.userid = userid
        this.image = images
    }

    async Uploadimage (res) {
        await this.insertImage({user_id: this.userid, img: this.image} ,res)
        
    }
    async getimage (res) {
        await this.getImage({user_id: this.userid}, res)
    }
}
module.exports = UploadImage;