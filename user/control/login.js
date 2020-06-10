let express = require('express');
let router = express.Router();
let checkUser = require('../model/checkUser');
module.exports = router;

router.post('/', async (req, res) => {
    let login = new checkUser()
    // let result = await login.checkuser(req.body.username, req.body.password)
    await login.checkuser(req.body.username, req.body.password, res)
    // res.json(result)
}) 