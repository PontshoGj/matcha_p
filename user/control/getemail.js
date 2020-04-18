const express = require('express');
const router = express.Router();

const getEmail = require('../model/getEmail');

module.exports = router;


router.post('/', async (req, res) => {
    //validating and registaring to the dtabase
    let email = new getEmail()
    let result = await email.getEmail(req.body.username);
    (result !== 0) ?
        res.json({result: 1, email: result}) :
        res.json({result: 0 ,username: "username does not exist"})
}) 