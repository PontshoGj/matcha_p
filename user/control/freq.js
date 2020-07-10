const express = require('express');
const router = express.Router();

const Freq = require('../model/Freq')

module.exports = router;

router.post('/', async (req, res) => {
    //validating and registaring to the dtabase
    let user = new Freq()
    await user.getfr(req.headers.userid, res);
}) 