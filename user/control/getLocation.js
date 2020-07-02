const express = require('express');
const router = express.Router();
const saveLocation = require('../model/saveLocation');
module.exports = router;

router.post('/', async (req, res) => {
    //validating and registaring to the dtabase
    let location = new saveLocation();

    // res.json((await new_registration.checkreg(res)))
    console.log(req.headers.userid)
    await location.getLoc(req.headers.userid,res)
}) 