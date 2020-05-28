
const express = require('express')
const jwt = require('jsonwebtoken');
const load = express()
const port = process.env.PORT || 3020
const fetch = require('node-fetch')
const bodyParser = require('body-parser')

load.use(bodyParser.json());
load.use(bodyParser.urlencoded({extended: false}));

// load.use( async (req, res, next) =>{
//     console.log(req.body)
//     let path = req.url.split('/')
//     if (path[1] === 'login' || path[1] === 'register'){
//         await fetch(`http://localhost:5005/${path[1]}`,{
//                 method: 'post',
//                 body: JSON.stringify(req.body),
//                 headers: {
//                     'Content-Type': 'application/json;charset=utf-8'
//                 }
//             }
//         )
//         .then (data => {
//             return data.json()
//         })
//         .then(data =>{
//             res.json(data);
//         })
//     }else{
//         next();
//     }
// })

load.all('/login*', async (req, res, next) =>{
    console.log(req.body)
    let path = req.url.split('/')
    console.log(path)
    await fetch(`http://localhost:5001/${path[1]}`,{
            method: 'post',
            body: JSON.stringify(req.body),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }
    )
    .then (data => {
        return data.json()
    })
    .then(data =>{
        let user ={
            id: data.id,
            username: data.username
        }
        jwt.sign({user}, 'secretkey', (err, token) => {
            res.json({
                token,
                result: data.result,
                id: data.id,
                firstinput: data.firstinput
            });
        });
    })
})

load.all('/save*', async (req, res, next) =>{
    console.log(req.body)
    let path = req.url.split('/')
    console.log(path)
    await fetch(`http://localhost:5001/${path[1]}`,{
            method: 'post',
            body: JSON.stringify(req.body),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }
    )
    .then (data => {
        return data.json()
    })
    .then(data =>{
        res.json({
            data,
        });
    })
})

load.all('/user/*', verify,async (req, res, next) =>{
    console.log(req.authData)
    let path = req.url.split('/')
    await fetch(`http://localhost:5001/${path[2]}`,{
                method: 'post',
                body: JSON.stringify(req.body),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
        }
    )
    .then (data => {
        return data.json()
    })
    .then (data => res.json(data))
    .catch (err => console.log(err))
    // next();
})

load.all('/uploadImage*', verify,async (req, res, next) =>{
    let path = req.url.split('/')
    await fetch(`http://localhost:5004/${path[2]}`,{
                method: 'post',
                body: JSON.stringify(req.body),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
        }
    )
    .then (data => {
        return data.json()
    })
    .then (data => res.json(data))
    .catch (err => console.log(err))
    // next();
})

function verify(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
      let bearer = bearerHeader.split(' ');
      let bearerToken = bearer[1];
      let token = bearerToken;
      jwt.verify(token, 'secretkey', (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            req.authData = authData
            next();
        }
      });
    } else {
      res.sendStatus(403);
    }
  }

load.listen(port, () => {console.log(`Load Running on Port ${port}`)})