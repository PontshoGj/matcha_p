const express = require('express');
const router = express.Router();

const getMatch = require('../model/getMatch')

module.exports = router;

router.post('/', async (req, res) => {
    //validating and registaring to the dtabase
    let user = new getMatch()
    // let userinfo = await user.getUserInfo(req.body.username);
    await user.getmatch(req.body.user_id, res);
}) 