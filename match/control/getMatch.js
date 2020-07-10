const express = require('express');
const router = express.Router();

const getMatch = require('../model/getMatch')

module.exports = router;

router.post('/', async (req, res) => {
    let user = new getMatch()
    await user.getmatch(req.body.interest, req.body.longitude, req.body.latidute, req.body.minage, req.body.maxage, req.body.gender, req.body.distance, req.body.user_id, res);
}) 