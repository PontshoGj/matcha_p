require('dotenv').config()
const express = require('express')
const mongo = require('mongodb').MongoClient;
const chat = express()
// chat.listen(4001)
const sockets = require('socket.io')
const client = sockets(4001);
const fetch = require('node-fetch')
const bodyParser = require('body-parser')

// chat.use(bodyParser.json());
// chat.use(bodyParser.urlencoded({extended: false}));



const gtfrnd = async bearer => {
    let getfriends = await fetch(`http://load:3020/user/getFriends`,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': `bearer ${bearer}`
            }
        })

    let friends = await getfriends.json();
    // console.log(friends)
    let ret = friends.userinfo.map(friend =>{
        return friend.id
    })
    // console.log(ret)
    return (ret)
}
// Connect to Socket.io
client.on('connection', async function(socket){
    // let chat = db.db("chart").collection('chats');

    // console.log(socket.id)
    // Create function to send status
    sendStatus = function(s){
        socket.emit('status', s);
    }

    socket.on("userconnect", async (data) =>{
        sendStatus({result: 'online'})
        // console.log(data)
        let jon = await gtfrnd(data.authorization)
        jon.map(j =>{
            socket.join(j);
        })
        socket.join(data.id)
    })

    socket.on('message', data =>{
        // console.log(data)
        client.to(data.id).emit("message", {friend_id:data.id, message: data.message})
    })
    socket.on("notif", data =>{
        socket.join(data.id);
        if (data.code !== undefined)
            client.emit("notif", {message: data.message, id: data.userid, code: data.code})
        else
            client.emit("notif", {message: data.message, id: data.userid})
    })
});

