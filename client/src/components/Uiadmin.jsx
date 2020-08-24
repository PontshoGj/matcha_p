import React, {useEffect } from 'react'
import NavigationSuccess from './navigation/NavigationSuccess'
import socketIOClient from "socket.io-client";
import FooterSuccess from './footer/FooterSuccess'
import {Message} from './message/Message'
import {Ut} from './ut/Ut'

const ENDPOINT = "http://127.0.0.1:4001";


export const Uiadmin = (props) => {
    // const {setLog, setLogStorage} = useContext(GlobalContext)
    // const [message, setMessage] = React.useState('');
    const socket = socketIOClient(ENDPOINT);
    const   [display, setDisplay] = React.useState()
    // const   [displays, setDisplays] = React.useState('none')
    useEffect(() => {

        socket.emit("userconnect",{authorization:localStorage.getItem('authorization'), userid: localStorage.getItem('id')})
        socket.on("notif", dat =>{
            if (dat.id === parseInt(localStorage.getItem('id'))){
                // setMessage(dat.message)
                // setDisplays('flex')
            }
        })
    })
    const onload = async () => {
        await fetch('/user/getban', {
            method: 'POST',
            redirect: 'manual',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'authorization': `bearer ${localStorage.getItem('authorization')}` 
            },
        })
        .then (data => {
            if(data.status !== 200) throw data
            return data.json()
        })
        .then (data =>{
            console.log(data)
            if (data.result === 1){
                let f = data.userinfo.map(ins =>{
                    return <Ut message={`${ins.firstname} ${ins.lastname} was blocked`} onload={onload} key={ins.id} id={ins.id}/>
                })
                setDisplay(f)
            }else{
                setDisplay(<Ut message={`no info`} onload={onload} key={1} id={-1}/>)
                // console.log(comps)
            }
        })
        .catch(err=>{

        })
    }
    if (display === undefined)
        onload()
    const changeLog = () =>{
        socket.emit("disconnected", {userid: localStorage.getItem('id')})
        localStorage.removeItem('authorization')
        localStorage.removeItem('id')
        localStorage.removeItem('firstinput')
        localStorage.removeItem('admin')
        setDisplay(<Message socket={socket}/>)
        localStorage.removeItem('log')
    }
    const changeProfile = () =>{};
    const changeMessage = () => {};
    const changeFriends = () => {};
    const changeMatch = () => {};
    const changeNotif = () => {};
    // const cli = () => {setDisplays('none')}
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
