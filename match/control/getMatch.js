const express = require('express');
const router = express.Router();

const getMatch = require('../model/getMatch')

module.exports = router;

router.post('/', async (req, res) => {
    let user = new getMatch()
    await user.getmatch(req.body.interest, req.body.longitude, req.body.latidute, res);
}) 