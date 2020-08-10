require('dotenv').config()
const express = require('express')
const chat = express()
// chat.listen(4001)
const server = require('http').createServer(chat);
const sockets = require('socket.io')
const client = sockets(server);
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const saves = require('./save')
const getMessage = require('./getMessage')

chat.use(bodyParser.json());
chat.use(bodyParser.urlencoded({extended: false}));

// chat.use('./gemessage', getMessage)


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
        sendStatus({result: data.userid})
        console.log(data)
        let jon = await gtfrnd(data.authorization)
        jon.map(j =>{
            socket.join(j);
        })
        socket.join(data.id)
    })

    socket.on('message', data =>{
        // console.log(data)
        client.to(data.id).emit("message", {friend_id:data.id, message: data.message})
        save(data.id, data.friend_id, data.message)
    })
    socket.on('getmessage', async data =>{
        // console.log(data)
        // client.to(data.id).emit("message", {friend_id:data.id, message: data.message})
        await getmessages( data.friend_id, data.id, client)
        // if (me.result)
            // console.log(me)
    })
    socket.on("notif", data =>{
        socket.join(data.id);
        if (data.code !== undefined)
            client.emit("notif", {message: data.message, id: data.userid, code: data.code})
        else
            client.emit("notif", {message: data.message, id: data.userid})
    })
});

server.listen(4001,()=>{console.log('chat running on PORT 4001')})