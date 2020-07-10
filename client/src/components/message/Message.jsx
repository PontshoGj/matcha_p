import React, {useEffect} from 'react'
import socketIOClient from "socket.io-client";
import { User } from './User'
import {Messages} from './Messages'
const ENDPOINT = "http://127.0.0.1:4001";

export const Message = () => {
    // const [response, setResponse] = React.useState();
    const   [comp, setComp] = React.useState()
    const   [message, setMessage] = React.useState()
    // const   [socket, setSocket] = React.useState(socketIOClient(ENDPOINT))
    const socket = socketIOClient(ENDPOINT);
    useEffect(() => {

        socket.on("status", data =>{
            // setResponse(data.result)
            console.log(data)
        })
        socket.emit("status",{authorization:localStorage.getItem('authorization')})
        socket.on("message", data =>{console.log(data)})
    })

    const onload = async () =>{
        await fetch('/user/getFriends', {
            method: 'POST',
            redirect: 'manual',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'authorization': `bearer ${localStorage.getItem('authorization')}` 
            },
        })
        .then (data => {
            if(data.status === 403) throw data
            return data.json()
        })
        .then (data =>{
            // console.log(data.userinfo)
            let holdInfo = data.userinfo.map(data => {
                // console.log(data)
                return <User data={data} setMessage={setMessage}/>
            })
            setComp(holdInfo)
        })
    }
    if (comp === undefined){
        // setSocket(socket)
        onload()
    }
    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
                // overflow: 'auto',
                height: '80vh'
            }}
        >
            <div
                style={{
                    display: 'column',
                    flexWrap: 'wrap',
                    width: "20%",
                    borderRight: 'solid',
                    height: '80vh',
                    overflow: 'auto',
                }}
            >
                {comp}
            </div>
            <div
                style={{
                    width: '80%',
                    height: '80vh'
                }}
            >
                <Messages message={message} socket={socket}/>
            </div>
        </div>
    )
}
