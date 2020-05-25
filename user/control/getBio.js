const express = require('express');
const router = express.Router();

const getBio = require('../model/getBio')

module.exports = router;

router.post('/', async (req, res) => {
    //validating and registaring to the dtabase
    let user = new getBio()
    let userinfo = await user.getBio(req.body.username);
    (userinfo !== 0) ?
        res.json({result: 1, userinfo}) :
        res.json({result: 0 ,username: "username does not exist"})
}) 