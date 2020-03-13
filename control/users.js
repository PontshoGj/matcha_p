let express = require('express');
let router = express.Router();

module.exports = router;

router.post('/api/update', (req, res) => {
    res.json({result: "update"})
})