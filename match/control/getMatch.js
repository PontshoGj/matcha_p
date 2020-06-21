const express = require('express');
const router = express.Router();

const getMatch = require('../model/getMatch')

module.exports = router;

router.post('/', async (req, res) => {
    console.log(req.body)
    //validating and registaring to the dtabase
    let user = new getMatch()
    await user.getmatch(req.body.interest, res);
}) 