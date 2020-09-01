import React, {useEffect } from 'react'
// import React, {useContext, useEffect } from 'react'
import NavigationSuccess from './navigation/NavigationSuccess'
// import FriendsCharts from './friends_charts/FriendsCharts'
import socketIOClient from "socket.io-client";
import FooterSuccess from './footer/FooterSuccess'
// import Chart from './friends_charts/Chart'
import {Profile} from './profile/Profile'
// import {GlobalContext} from '../context/GlobalState'
import {Message} from './message/Message'
import {Friends} from './friends/Friends'
import {Match} from './match/Match'
import {Messages} from './errorsAndmessages/Messages'
import {Notif} from './notif/Notif'

const ENDPOINT = "http://127.0.0.1:4001";


export const UIProfile = (props) => {
    // const {setLog, setLogStorage} = useContext(GlobalContext)
    const [message, setMessage] = React.useState('');
    const socket = socketIOClient(ENDPOINT);
    const   [display, setDisplay] = React.useState(<Profile />)
    const   [displays, setDisplays] = React.useState('none')
    useEffect(() => {
        // console.log(socket.connected)
        if (socket.connected){
            socket.emit("userconnect",{authorization:localStorage.getItem('authorization'), userid: localStorage.getItem('id')})
        }
            socket.on("notif", dat =>{
                if (dat.id === parseInt(localStorage.getItem('id'))){
                    setMessage(dat.message)
                    setDisplays('flex')
                }
            })
    })

    const changeLog = () =>{
        socket.emit("disconnected", {userid: localStorage.getItem('id')})
        localStorage.removeItem('authorization')
        localStorage.removeItem('id')
        localStorage.removeItem('firstinput')
        setDisplay(<Message socket={socket}/>)
        localStorage.removeItem('log')
    }
    const changeProfile = () =>{setDisplay(<Profile socket={socket}/>)};
    const changeMessage = () => {setDisplay(<Message socket={socket}/>)};
    const changeFriends = () => {setDisplay(<Friends socket={socket} changeMessage={changeMessage} />)};
    const changeMatch = () => {setDisplay(<Match socket={socket}/>)};
    const changeNotif = () => {setDisplay(<Notif />)};
    const cli = () => {setDisplays('none')}
    return (
        <div 
            style={{
                display: 'reletive',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                height: '100%',
                width: '100%',
            }}
        >
            <div
                style={{
                }}
            >
                <NavigationSuccess 
                    changeLog={changeLog} 
                    changeProfile={changeProfile}
                    changeFriends={changeFriends}
                    changeMatch={changeMatch}
                    changeMessage={changeMessage}
                    changeNotif={changeNotif}
                />
            </div>
            <div onClick={cli}>
                <Messages message={message} display={displays} />
            </div>
            <div
                style={{
                    width: '100%',
                    height: '80vh',
                }}
            >

                { display }
            </div>

            <div
                style={{
                    // gridArea: 'footer'
                }}
            >
                <FooterSuccess />
            </div>
        </div>
    )
}
