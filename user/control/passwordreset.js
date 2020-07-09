const express = require('express');
const router = express.Router();

const Passwordreset = require('../model/passwordreset')
module.exports = router;

router.post('/', async (req, res) => {
    //validating and registaring to the dtabase
    // console.log(req.body.email)
    let pass = new Passwordreset()
    await pass.passwordreset(
        req.body.email
    , res);
}) 