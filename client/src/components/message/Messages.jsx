import React, {useEffect} from 'react'
import {Button, Form, Col, Row} from 'react-bootstrap'
import {Mes} from './Mes'

export const Messages = ({message, socket, id}) => {
    const   [messages, setMessage] = React.useState({})
    const   [replay, setReplay] = React.useState('')
    
    let les = [];
    useEffect(()=>{
    //     // let les =   message.map(messages =>{
    //     //     let i = 0
    //     //     return  <Mes message={messages.message} key={i++}/>})
    //         // return  messages.message}):'')
    //         console.log(message)
    //     let mes = Object.keys(message).map((key) => {
    //         return (
    //             <Mes message={key.message}/>
    //         )
    //     })
    // let s = message.map(mes=> mes)
    setReplay(message)
    console.log(message)
            
    })
    const onSubmit = async (e) => {
        e.preventDefault()
        socket.emit('message', {id: localStorage.getItem('id'),friend_id: id, message: messages.message})
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
