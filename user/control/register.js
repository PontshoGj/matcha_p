const express = require('express');
const router = express.Router();
const validater = require('../model/validater');
module.exports = router;

router.post('/', async (req, res) => {
    //validating and registaring to the dtabase
    let new_registration = new validater(
                                        req.body.firstname, 
                                        req.body.lastname, 
                                        req.body.username, 
                                        req.body.password, 
                                        req.body.email
                            );
    //returning the results of the registration process
    res.json((await new_registration.checkreg()))
}) 