const express = require('express');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');

const login = require('./control/login')
const save = require('./control/register')
const updateinfo = require('./control/update')

const server = express();
let port = process.env.PORT || 5001;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(express.json())
server.use('/login', login)
server.use('/save', save)
server.use('/updateinfo', updateinfo)


server.listen(port, () => {console.log(`User Running on Port ${port}`)})