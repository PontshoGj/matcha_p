const express = require('express');
const router = express.Router();

const getBio = require('../model/getBio')

module.exports = router;

router.post('/', async (req, res) => {
    //validating and registaring to the dtabase
    let user = new getBio()
    await user.getBio(req.body.username, res);
}) 