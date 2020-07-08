const express = require('express');
const router = express.Router();

const ValidateAccount = require('../model/ValidateAccount')

module.exports = router;

router.post('/', async (req, res) => {
    let validate = new ValidateAccount();
    await validate.validateAccount(req.body.token, req.body.selec, res);
    // res.json(emailResult, res)
}) 