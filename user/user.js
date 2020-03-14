const express = require('express');
const jwt = require('jsonwebtoken')

const login = require('./control/login')
const save = require('./control/register')
const server = express();
let port = process.env.PORT || 5001;

server.use(express.json())
server.use('/login', login)
server.use('/save', save)



server.listen(port, () => {console.log(`User Running on Port ${port}`)})