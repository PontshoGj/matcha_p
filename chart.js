require('dotenv').config()

const express = require('express');
const jwt = require('jsonwebtoken')

const server = express();
let port = process.env.PORT || 5002;

server.use(express.json())

server.post('/chart/*', authenticateToken, (next) => {
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

server.listen(port, () => {console.log(`Running on Port ${port}`)})