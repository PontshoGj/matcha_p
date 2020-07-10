const express = require('express');
const router = express.Router();
const addFriend = require('../model/addFriend');
module.exports = router;

router.post('/', async (req, res) => {
    let g = new addFriend();
    // console.log(req.headers)
    await g.friend(req.headers.userid, req.body.id, res)
}) 