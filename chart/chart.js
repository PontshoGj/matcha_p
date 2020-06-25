require('dotenv').config()
const express = require('express')
const mongo = require('mongodb').MongoClient;
const chat = express()
const sockets = require('socket.io')
const client = sockets(4001);
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
chat.use(bodyParser.json());
chat.use(bodyParser.urlencoded({extended: false}));



const gtfrnd = async bearer => {
    let getfriends = await fetch(`http://localhost:3020/user/getFriends`,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': `bearer ${bearer}`
            }
        })

    let friends = await getfriends.json();
    let ret = friends.userinfo.map(friend =>{
        return friend.id
    })
    // console.log(ret)
    return (ret)
}
// Connect to Socket.io
client.on('connection', async function(socket){
    // let chat = db.db("chart").collection('chats');

    console.log('connected')
    // Create function to send status
    sendStatus = function(s){
        socket.emit('status', s);
    }
    socket.on("status", async (data) =>{
        sendStatus({result: 'online'})
        // console.log(data)
        let jon = await gtfrnd(data.authorization)
        jon.map(j =>{
            socket.join(j);
        })
    })

    socket.on('FromAPI', function(data){
        let name = data.name;
        let message = data.message;

        // Check for name and message
        if(name == '' || message == ''){
            // Send error status
            sendStatus('Please enter a name and message');
        } else {
            // Insert message
            chat.insert({name: name, message: message}, function(){
                client.emit('output', [data]);

                // Send status object
                sendStatus({
                    message: 'Message sent',
                    clear: true
                });
            });
        }
    });
});

chat.listen(4002)
