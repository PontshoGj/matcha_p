const express = require('express');
const router = express.Router();

const UpdateEmail = require('../model/getEmail')

module.exports = router;

router.post('/', async (req, res) => {
    //validating and registaring to the dtabase
    let email = new UpdateEmail();
    await email.updateEmail({
            username: req.body.username,
            email: req.body.email,
        }, res);
}) 