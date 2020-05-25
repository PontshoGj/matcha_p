const express = require('express');
const router = express.Router();
const validateUpadte = require('../model/validateUpdate');
module.exports = router;

router.post('/', async (req, res) => {
    //validating and registaring to the dtabase
    let updateUser = new validateUpadte(
                                req.body.age, 
                                req.body.race, 
                                req.body.interest, 
                                req.body.bio,
                                req.body.username,
                                req.body.gender
                            );
    console.log(req.body.gender)
    //returning the results of the registration process
    res.json((await updateUser.updateInfo()))
}) 