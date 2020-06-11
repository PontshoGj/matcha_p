const express = require('express');
const router = express.Router();
const validateUpadte = require('../model/validateUpdate');
module.exports = router;

router.post('/', async (req, res) => {
    //validating and registaring to the dtabase
    let updateUser = new validateUpadte(
                                req.body.age, 
                                req.body.firstname, 
                                req.body.interest, 
                                req.body.lastname,
                                req.body.username,
                                req.body.gender
                            );
    console.log(req.body.gender)
    await updateUser.updateInfo(res)
}) 