const db = require('./dbConnection')
//class that validates the user input during registration
class UploadImage extends db {

    constructor (userid, images, num){
        super();
        this.userid = userid
        this.image = images
        this.num = num
    }

    async Uploadimage (res) {
        await this.insertImage({user_id: this.userid, img: this.image} ,res)
        
    }
    async getimage (res) {
        await this.getImage({user_id: this.userid}, res)
    }
    async updateimage (res) {
        // console.log(this.userid)
        // console.log(this.num)
        // console.log(this.image)
        await this.updateImage({img: this.image, user_id: parseInt(this.userid),  image_id: parseInt(this.num)}, res)
    }
    async getprofimage (res) {
        await this.getProfImage({user_id: this.userid}, res)
    }
    async updateprofimage (res) {
        // console.log(this.userid)
        // console.log(this.num)
        // console.log(this.image)
        await this.updateProfImage({img: this.image, user_id: parseInt(this.userid),  image_id: parseInt(this.num)}, res)
    }
}
module.exports = UploadImage;