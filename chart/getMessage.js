const express = require('express');
const router = express.Router();
const db = require('./db')

module.exports = router;

getmessages = async (friend_id, user_id, client) => {
    let getmessage  = new db()
    await getmessage.getmes(friend_id, user_id, client)
}

module.exports.getmessages = this.getmessages;
