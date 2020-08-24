const express = require('express');
const router = express.Router();
const L = require('../model/L');
module.exports = router;

router.post('/', async (req, res) => {
    let g = new L();
    // console.log(req.headers)
    await g.deles(req.body.id, res)
}) 