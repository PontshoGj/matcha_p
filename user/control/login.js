let express = require('express');
let router = express.Router();
let checkUser = require('../model/checkUser');
module.exports = router;

router.post('/', async (req, res) => {
    let login = new checkUser()
    if (await login.checkuser(req.body.username, req.body.password))
        res.json({result: 1})
    else
        res.json({result: 0})
    
}) 