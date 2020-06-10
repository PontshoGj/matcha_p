const express = require('express');
const router = express.Router();

const UpdateBio = require('../model/getBio')

module.exports = router;

router.post('/', async (req, res) => {
    //validating and registaring to the dtabase
    let email = new UpdateBio();
    // let emailResult = await email.updateBio({
    //     username: req.body.username,
    //     bio: req.body.bio
    // }, res);
    await email.updateBio({
        username: req.body.username,
        bio: req.body.bio
    }, res);
    // res.json(emailResult, res)
}) 