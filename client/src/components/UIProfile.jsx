import React, {useContext, useEffect } from 'react'
import NavigationSuccess from './navigation/NavigationSuccess'
// import FriendsCharts from './friends_charts/FriendsCharts'
import socketIOClient from "socket.io-client";
import FooterSuccess from './footer/FooterSuccess'
// import Chart from './friends_charts/Chart'
import {Profile} from './profile/Profile'
import {GlobalContext} from '../context/GlobalState'
import {Message} from './message/Message'
import {Friends} from './friends/Friends'
import {Match} from './match/Match'
import {Messages} from './errorsAndmessages/Messages'
const ENDPOINT = "http://127.0.0.1:4001";


export const UIProfile = (props) => {
    const {setLog, setLogStorage} = useContext(GlobalContext)
    const [message, setMessage] = React.useState('');
    const socket = socketIOClient(ENDPOINT);
    const   [display, setDisplay] = React.useState(<Profile />)
    const   [displays, setDisplays] = React.useState('none')
    useEffect(() => {

        socket.emit("userconnect",{authorization:localStorage.getItem('authorization'), userid: localStorage.getItem('id')})
        socket.on("notif", dat =>{
            console.log(dat)
            setMessage(dat)
            setDisplays('reletive')
        })
    })

    const changeLog = () =>{
        setLog(false)
        setLogStorage(false)
    }
    const changeProfile = () =>{setDisplay(<Profile socket={socket}/>)};
    const changeMessage = () => {setDisplay(<Message socket={socket}/>)};
    const changeFriends = () => {setDisplay(<Friends socket={socket} changeMessage={changeMessage} />)};
    const changeMatch = () => {setDisplay(<Match socket={socket}/>)};
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
                />
            </div>
            <div
                style={{
                    width: '100%',
                    height: '80vh',
                }}
            >

                { display }
                <Messages message={message} display={displays}/>
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
