const express = require('express');
const router = express.Router();
const L = require('../model/getNotif');
module.exports = router;

router.post('/', async (req, res) => {
    let g = new L();
    // console.log(req.headers)
    await g.getnotif(req.headers.userid, res)
}) 