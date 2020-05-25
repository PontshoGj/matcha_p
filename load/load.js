const express = require('express')
const load = express()
const port = process.env.PORT || 3020
const fetch = require('node-fetch')
const bodyParser = require('body-parser')

load.use(bodyParser.json());
load.use(bodyParser.urlencoded({extended: false}));

load.use( async (req, res, next) =>{
    console.log(req)
    let path = req.url.split('/')
    if (path[1] === 'login' || path[1] === 'register'){
        await fetch(`http://localhost:5005/${path[1]}`,{
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
            res.json(data);
        })
    }else{
        next();
    }
})

load.all('/user/*',async (req, res, next) =>{
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

load.all('/uploadImage*',async (req, res, next) =>{
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

load.listen(port, () => {console.log(`Load Running on Port ${port}`)})