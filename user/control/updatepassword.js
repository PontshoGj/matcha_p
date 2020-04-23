const express = require('express');
const router = express.Router();

const Updatepassword = require('../model/UpdatePassword')
module.exports = router;

router.post('/', async (req, res) => {
    //validating and registaring to the dtabase
    let pass = new Updatepassword()
    let passReturn = await pass.UpdatePassword({
        username: req.body.username,
        password: req.body.password
    });
    if (passReturn === 1){
        res.json({result: 1})
    }else{
        res.json({result: 0})
    }
}) 