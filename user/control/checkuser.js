const express = require('express');
const router = express.Router();
const checkUser = require('../model/checkUser')
module.exports = router;

router.post('/', async (req, res) => {
    //validating and registaring to the dtabase
    let user = new checkUser();
    let userResult = await user.checkuser(req.body.username, req.body.password);
    res.json({result: userResult});

}) 