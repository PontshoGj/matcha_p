
const express = require('express')
const jwt = require('jsonwebtoken');
const load = express()
const port = process.env.PORT || 3020
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const multer = require('multer')
const FormData = require('form-data');
const fs = require('fs')

load.use(bodyParser.json());
load.use(bodyParser.urlencoded({extended: false}));


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
    console.log(req.authData.user.username)
    req.body.username = req.authData.user.username
    console.log(req.body)
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
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        // console.log(file)
        file.userid = req.authData.user.id
        // console.log(files)
        cb(null, './')
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
});


const upload = multer({ storage: storage})

load.all('/uploadImage*', verify, upload.single('pic'),async (req, res) =>{
    let path = req.url.split('/')
    // console.log(req.file)
    const file = new FormData()
    // console.log(req.authData.user.id)
    file.append('pic', fs.createReadStream(req.file.filename), req.authData.user.id)
    // file.append('userid', req.authData.user.)
    // file.append('userid',req.authData.user.id)
    // file.append('pic', req.file)
    await fetch(`http://localhost:5004/${path[1]}`,{
                method: 'post',
                headers: {
                    'userid': req.authData.user.id
                },
                body: file
        }
    )
    .then (data => {
        if (data.status === 500) throw data
        return data.json()
    })
    .then (data => {
        // console.log(data)
            fs.unlinkSync(req.file.filename)
            res.json(data)
    })
    .catch (err => {
        res.json({result: 0, message: 'image format not accepted'})   
        // console.log(err)
    })
    // res.sendStatus(200)
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