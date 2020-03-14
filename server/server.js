require('dotenv').config()

const express = require('express');
const jwt = require('jsonwebtoken')

const api = require('./control/users')
const server = express();
let port = process.env.PORT || 5000;

server.use(express.json())
server.use('/api', api)

server.post('/api/*', authenticateToken, (next) => {
    console.log("user is authenticated")
    next()
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }


server.listen(port, () => {console.log(`Server running on Port ${port}`)})