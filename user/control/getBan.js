const express = require('express');
const router = express.Router();

const Ban = require('../model/Ban')

module.exports = router;

router.post('/', async (req, res) => {
    //validating and registaring to the dtabase
    let user = new Ban()
    await user.getBan( res);
}) 