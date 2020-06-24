const express = require('express');
const router = express.Router();
const getLike = require('../model/getLike');
module.exports = router;

router.post('/', async (req, res) => {
    //validating and registaring to the dtabase
    let updateUser = new getLike();
    //returning the results of the registration process
    await updateUser.like(req.headers.userid, req.body.friend_id, res)
}) 