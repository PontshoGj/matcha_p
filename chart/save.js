const db = require('./db')

save = (user_id, friend_id, mes) =>{
   let message = new db()
    message.save(friend_id, user_id, mes)
}


module.exports.save = this.save;
