const express = require('express');
const fetch = require('node-fetch');
const auth = express();
const bodyParser = require('body-parser')

let port = process.env.POR || 5005;


auth.use(bodyParser.json());
auth.use(bodyParser.urlencoded({extended: false}));

auth.post('/login', async (req, res) =>{
    console.log(req.body)
    await fetch(`http://localhost:5001/login`,{
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
    .then (data => {
        console.log(data)    
        res.json(data)
    })
})


auth.listen(port, () => {console.log(`Auth Running on port ${port}`)});