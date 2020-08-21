const db = require('./db')

save = (user_id, friend_id, mes) =>{
   let message = new db()
    message.save(friend_id, user_id, mes)
}


module.exports.save = this.save;

savelog = (id) =>{
   let time = new Date()
   let d = String(time.getDate()).padStart(2, '0')
   let m = String(time.getMonth() + 1).padStart(2, `0`)
   let y = time.getFullYear()

//    let today = m + '/' + d + '/' + y
    // console.log(today)
    let t = new db()
    t.savet(`${y}-${m}-${d}`, id)
}
module.exports.savelog = this.savelog;
