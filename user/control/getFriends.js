const express = require('express');
const router = express.Router();

const getFriends = require('../model/getFriends')

module.exports = router;

router.post('/', async (req, res) => {
    //validating and registaring to the dtabase
    let user = new getFriends()
    await user.getfriends(req.headers.userid, res);
}) 