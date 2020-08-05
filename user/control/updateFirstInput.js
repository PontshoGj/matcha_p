const express = require('express');
const router = express.Router();

const updateFirstInput = require('../model/updateFirstInput')

module.exports = router;

router.post('/', async (req, res) => {
    //validating and registaring to the dtabase
    let firstinput = new updateFirstInput();
    // let firstResult = await firstinput.updatefirstinput(
    //     req.body.username
    // );
    // console.log(req.body.username)
    await firstinput.updatefirstinput(
        req.body.username,
        res
    );
    // res.json(firstResult)
}) 