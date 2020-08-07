import React, {useEffect} from 'react'
import {Button, Form, Col, Row} from 'react-bootstrap'
import {Mes} from './Mes'

export const Messages = ({message, socket, id}) => {
    const   [messages, setMessage] = React.useState({})
    const   [replay, setReplay] = React.useState('')
    
    let les = [];
    useEffect(()=>{

    setReplay(message)
    console.log(message)
            
    })
    const onSubmit = async (e) => {
        e.preventDefault()
        socket.emit('message', {id: localStorage.getItem('id'),friend_id: id, message: messages.message})
        socket.emit("notif", {id: localStorage.getItem('id'), userid: id, message: 'new message'})
    }
    // let less = les.map(message=>message)
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
                    display: 'flex',
                    flexWrap: 'wrap',
                    overflow: 'auto',
                    justiflyContent: 'center',
                    border: '0.1vh solid'
                }}
            >
               {/* {replay} */}
               {message}
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
                            <Form.Control type="text" name="message" onChange={changeEvent => setMessage({message: changeEvent.target.value})}/>
                            <Button variant="dark"  type='submit'   style={{width: '98vw'}} block>Send</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}
