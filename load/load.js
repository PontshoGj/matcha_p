
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
    let path = req.url.split('/')
    await fetch(`http://usermanagement:5001/${path[1]}`,{
            method: 'post',
            body: JSON.stringify(req.body),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }
    )
    .then (data => {
        if (data.status === 500) throw data
        return data.json()
    })
    .then(data =>{
        if (data.result){
            let user ={
                id: data.id,
                username: data.username
            }
            jwt.sign({user}, 'secretkey', (err, token) => {
                res.status(200).json({
                    token,
                    result: data.result,
                    id: data.id,
                    firstinput: data.firstinput
                });
            });
        }else{
            res.json({result: data.result})
        }
    })
    .catch(err => {})
})

load.all('/save*', async (req, res, next) =>{
    let path = req.url.split('/')
    await fetch(`http://usermanagement:5001/${path[1]}`,{
            method: 'post',
            body: JSON.stringify(req.body),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }
    )
    .then (data => {
        if (data.status === 500) throw data
        return data.json()
    })
    .then(data =>{res.status(200).json({data});})
    .catch(data=>{console.log(data)})
})

load.all('/user/*', verify,async (req, res, next) =>{
    req.body.username = req.authData.user.username
    let path = req.url.split('/')
    await fetch(`http://usermanagement:5001/${path[2]}`,{
                method: 'post',
                body: JSON.stringify(req.body),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'userid': req.authData.user.id
                }
        }
    )
    .then (data => {
        if (data.status === 500) throw data
        return data.json()
    })
    .then (data => res.status(200).json(data))
    .catch (err => console.log(err))
})

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        file.userid = req.authData.user.id
        cb(null, './')
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
});


const upload = multer({ storage: storage})

load.all('/uploadImage*', verify, upload.single('pic'),async (req, res) =>{
    let path = req.url.split('/')
    const file = new FormData()
    file.append('pic', fs.createReadStream(req.file.filename), req.authData.user.id)
    await fetch(`http://fileserver:5004/${path[1]}`,{
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
            fs.unlinkSync(req.file.filename)
            res.status(200).json(data)
    })
    .catch (err => {res.json({result: 0, message: 'image format not accepted'});})
})

load.all('/getImage*', verify,async (req, res) =>{
    let path = req.url.split('/')
    await fetch(`http://fileserver:5004/${path[1]}`,{
            method: 'post',
            headers: {
                'userid': req.authData.user.id
            },
        }
    )
    .then (data => {
        console.log(data.status)
        if (data.status === 500) throw data
        return data.json()
    })
    .then (data => {res.status(200).json(data)})
    .catch (err => {res.json({result: 0, message: 'image format not accepted'});})
})

load.all('/match/*', verify,async (req, res) =>{
    let path = req.url.split('/')

    let person = await fetch('http://usermanagement:5001/getmatch',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({user_id: req.authData.user.id})
    })
    let person_response = await person.json();
    let gender
    if (person_response.userinfo.gender === "male")
        gender = 'gender = \"Female\"'
    else if (person_response.userinfo.gender === "female")
        gender = 'gender = \'Male\''
    else if (person_response.userinfo.gender === "gay")
        gender = 'gender = \'Male\''
    else if (person_response.userinfo.gender === "lesbian")
        gender = 'gender = \'Female\''
    else
        gender = 'gender = \'Male\' || gender = \'Female\''
    // console.log(person_response)
    // console.log(req.body)
    console.log(person_response.userinfo.interest)
    let interest = (req.body.interest !== undefined) ? req.body.interest : person_response.userinfo.interest
    // // let interest = person_response.userinfo.interest
    let minage = (req.body.minage !== undefined) ? req.body.minage : person_response.userinfo.age
    let maxage = (req.body.maxage !== undefined) ? req.body.maxage : person_response.userinfo.age
    console.log(interest)
    console.log(minage)
    console.log(maxage)
    
    
    let user_id = {user_id: req.authData.user.id, interest: interest, latidute: person_response.userinfo.latidute, longitude: person_response.userinfo.longitude, minage: minage, maxage: maxage, gender: gender }
    await fetch(`http://match:5005/${path[2]}`,{
            method: 'post',
            body: JSON.stringify(user_id), 
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        }
    )
    .then (data => {
        if (data.status === 500) throw data
        return data.json()
    })
    .then (data => {res.status(200).json(data)})
    .catch(err =>{console.log(err)})
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