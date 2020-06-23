const express = require('express');
const router = express.Router();
const Like = require('../model/getLike');
module.exports = router;

router.post('/', async (req, res) => {
    //validating and registaring to the dtabase
    let updateUser = new InsertFirst();
    //returning the results of the registration process
    await updateUser.like(req.body.user_id, friend_id, res)
}) 