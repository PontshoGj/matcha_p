const express = require('express');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');

const save = require('./control/register')
const updateinfo = require('./control/update')
const updateemail = require('./control/updateemail')
const updateusername = require('./control/updateusername')
const updatepassword = require('./control/updatepassword')
const getuser = require('./control/getinfo');
const getemail = require('./control/getemail');
const checkuser = require('./control/checkuser')
const login = require('./control/login')
const bio = require('./control/getBio')
const updatebio = require('./control/updatebio')
const insertFirst = require('./control/insertFirst')
const server = express();
let port = process.env.PORT || 5001;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
// server.use(express.json());
server.use('/save', save);
server.use('/updateinfo', updateinfo);
server.use('/first', insertFirst);
server.use('/second', updateinfo);
server.use('/third', updateinfo);
server.use('/fourth', updateinfo);
server.use('/updateemail', updateemail);
server.use('/updatesuername', updateusername);
server.use('/updatepassword', updatepassword);
server.use('/getuserinfo', getuser);
server.use('/getemail', getemail);
server.use('/checkuser', checkuser);
server.use('/login', login);
server.use('/updatebio', updatebio);
server.use('/getbio', bio);

server.listen(port, () => {console.log(`User Running on Port ${port}`)})