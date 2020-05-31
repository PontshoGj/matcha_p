const express = require('express');
const router = express.Router();
const InsertFirst = require('../model/InsertFirst');
module.exports = router;

router.post('/', async (req, res) => {
    //validating and registaring to the dtabase
    let updateUser = new InsertFirst(
                                req.body.age, 
                                req.body.race, 
                                req.body.interest, 
                                req.body.username,
                                req.body.gender
                            );
    //returning the results of the registration process
    res.json((await updateUser.insertInfo()))
}) 