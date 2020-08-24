const express = require('express');
const router = express.Router();
const L = require('../model/getMessage');
module.exports = router;

router.post('/', async (req, res) => {
    let g = new L();
    console.log(req.headers)
    await g.getmessage(req.body.friend_id, req.headers.userid, res)
}) 