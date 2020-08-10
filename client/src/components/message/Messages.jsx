import React, {useEffect} from 'react'
import {Button, Form} from 'react-bootstrap'
import {Mes} from './Mes'

export const Messages = ({firstname, lastname, socket, id}) => {
    const   [messages, setMessage] = React.useState({})
    const   [replay, setReplay] = React.useState('')
    
    useEffect(()=>{

        let d = []
        let i = 0
        socket.on('me', data=>{
            // console.log(parseInt(data.user_id) === parseInt(localStorage.getItem('id')))
            if (parseInt(data.friend_id) === parseInt(id) && parseInt(data.user_id) === parseInt(localStorage.getItem('id'))){
                d.push(data.info.map(dat=>{
                    let who = (parseInt(dat.from) === parseInt(localStorage.getItem('id')))? 'you':'friend';
                    console.log(dat)
                    return <Mes message={dat.message} key={i++} who={who} firstname={firstname} lastname={lastname}/>
                }))
                setReplay(d)
            }
        })
        socket.on('message', data=>{socket.emit('getmessage', {id: localStorage.getItem('id'),friend_id: id})})
    })
    const onload = async() =>{
        socket.emit('getmessage', {id: localStorage.getItem('id'),friend_id: id})

    }
    if (replay === '')
        onload()
    const onSubmit = async (e) => {
        e.preventDefault()
        socket.emit('message', {id: localStorage.getItem('id'),friend_id: id, message: messages.message})
        socket.emit("notif", {id: localStorage.getItem('id'), userid: id, message: 'new message'})
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
                            <Form.Control type="text" name="message" style={{width: '98vw'}} onChange={changeEvent => setMessage({message: changeEvent.target.value})}/>
                            <Button variant="dark"  type='submit'   style={{width: '98vw'}} block>Send</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}
