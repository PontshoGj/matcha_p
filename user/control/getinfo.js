const express = require('express');
const router = express.Router();

const getInfo = require('../model/getInfo')

module.exports = router;

router.post('/', async (req, res) => {
    //validating and registaring to the dtabase
    let user = new getInfo()
    // let userinfo = await user.getUserInfo(req.body.username);
    await user.getUserInfo(req.body.username, res);
    // (userinfo !== 0) ?
    //     res.json({result: 1, userinfo}) :
    //     res.json({result: 0 ,username: "username does not exist"})
}) 