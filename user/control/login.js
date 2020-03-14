let express = require('express');
let router = express.Router();

module.exports = router;

router.post('/', (req, res) => {
    res.json({result: "login"})
}) 