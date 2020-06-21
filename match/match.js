const express = require('express');
const fetch = require('node-fetch');
const match = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
let port = process.env.POR || 5005;
const getmatch = require('./control/getMatch');

match.use(bodyParser.json());
match.use(bodyParser.urlencoded({extended: false}));

match.use('/getMatch', getmatch);


match.listen(port, () => {console.log(`Match Running on port ${port}`)});