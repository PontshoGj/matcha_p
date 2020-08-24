import React, {useEffect} from 'react'
import {Button, Form} from 'react-bootstrap'
import {Mes} from './Mes'

export const Messages = ({firstname, lastname, socket, id}) => {
    const   [messages, setMessage] = React.useState({})
    const   [replay, setReplay] = React.useState('')
    const   [disabled, setDisabled] = React.useState(false)
    useEffect(()=>{

        // let d = []
        // let i = 0
        socket.on('me', data=>{
            // console.log(parseInt(data.user_id) === parseInt(localStorage.getItem('id')))
            if (parseInt(data.friend_id) === parseInt(id) && parseInt(data.user_id) === parseInt(localStorage.getItem('id'))){
                // d.push(data.info.map(dat=>{
                //     let who = (parseInt(dat.from) === parseInt(localStorage.getItem('id')))? 'you':'friend';
                //     // console.log(dat)
                //     return <Mes message={dat.message} key={i++} who={who} firstname={firstname} lastname={lastname}/>
                // }))
                // setReplay(d)
                onload()
            }
        })
        socket.on('message', data=>{socket.emit('getmessage', {id: localStorage.getItem('id'),friend_id: id})})
    })
    const onload = async() =>{
        // socket.emit('getmessage', {id: localStorage.getItem('id'),friend_id: id})
        await fetch('/user/getmessage', {
            method: 'POST',
            redirect: 'manual',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'authorization': `bearer ${localStorage.getItem('authorization')}` 
            },
            body: JSON.stringify({friend_id: id})
        })
        .then (data => {
            if(data.status !== 200) throw data
            return data.json()
        })
        .then (data => {
            // console.log(data);
            // if (data.result === -1)
            //     setLog(false)
            if (data.result === 1){
                let d = []
                let i = 0
                d.push(data.info.map(dat=>{
                    let who = (parseInt(dat.from) === parseInt(localStorage.getItem('id')))? 'you':'friend';
                    // console.log(dat)
                    return <Mes message={dat.message} key={i++} who={who} firstname={firstname} lastname={lastname}/>
                }))
                setReplay(d)
            }
        })
        .catch(err => {
            // if (err === 403)
            //     setLog(false)
        })

    }
    if (replay === '')
        onload()
    const onSubmit = async (e) => {
        e.preventDefault()
        setDisabled(true)
        socket.emit('message', {id: localStorage.getItem('id'),friend_id: id, message: messages.message})
        socket.emit("notif", {id: localStorage.getItem('id'), userid: id, message: `${localStorage.getItem('firstname')} ${localStorage.getItem('lastname')} sent a new message`})
        onload()
        setTimeout(()=>{setDisabled(false)}, 3000)
    }
    return (
        <div
            style={{
                    display: 'column',
                    height: '40vh',
                    width: '98vw',
                    marginLeft: '1vw', 
            }}
        >
            <div
                style={{
                    height: '30vh',
                    width: '98vw',
                    display: 'column',
                    // flexWrap: 'wrap',
                    overflow: 'auto',
                    // justiflyContent: 'center',
                    border: '0.1vh solid'
                }}
            >
               <div>{replay}</div>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    height: '10vh',
                    width: '100%',
                    // border: 'solid'
                }}
            >
                <Form onSubmit={onSubmit}>
                    <Form.Group  controlId='formHorizontalMessage'>
                            <Form.Control type="text" name="message"  style={{width: '98vw'}} disabled={disabled} onChange={changeEvent => setMessage({message: changeEvent.target.value})}/>
                            <Button variant="dark"  type='submit'   style={{width: '98vw'}} disabled={disabled} block>Send</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}
