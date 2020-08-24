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

let online = []
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
    let ret = 0
    if (friends.result === 1){
    ret = friends.userinfo.map(friend =>{
        return friend.id
    })
    }
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
        try{
        sendStatus({result: data.userid})
        
        online.push({id: data.userid})
        // console.log(data)
        let jon = await gtfrnd(data.authorization)
        jon.map(j =>{
            socket.join(j);
        })
        socket.join({userid: data.id})
        savelog(data.userid)
    }catch(error){

    }
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
    socket.on('check', data=>{
        // console.log(online)
        online.map(user=>{
            if (parseInt(user.id) === parseInt(data.id))
            {
                socket.emit("onli", {online: 1, userid: data.id})
                // console.log('online')
            }
        })
    })

    socket.on('disconnected', data=>{
        // console.log('disconnect')
        const finalArr = online.filter(dat =>{
            let i = 0
            for(let j = 0; j < online.length; j++){
                if (parseInt(dat.id) === parseInt(data.userid)){
                    i = 1
                }
            }
            if (!i)
                return dat
        })
        // console.log(finalArr)
        finalArr.map(user=>{
            if (parseInt(user.id) !== parseInt(data.userid))
            {
                socket.emit("onli", {online: 0, userid: data.userid})
                // console.log('disconnect')
            }
        })
    })

    socket.on("notif", data =>{
        socket.join(data.id);
        // console.log(data)
        if (data.code !== undefined)
            client.emit("notif", {message: data.message, id: data.userid, code: data.code})
        else
            client.emit("notif", {message: data.message, id: data.userid})
        savenotif(data.id, data.userid, data.message)
    })
});


server.listen(4001,()=>{console.log('chat running on PORT 4001')})