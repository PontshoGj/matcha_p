import React, {useEffect} from 'react'
import socketIOClient from "socket.io-client";
import {Button, Form, Col, Row} from 'react-bootstrap'
// import {useForm} from 'react-hook-form'
const ENDPOINT = "http://127.0.0.1:4001";

// import socketIOClient from "socket.io-client";

export const Messages = ({message}) => {
    const   [messages, setMessage] = React.useState({})
    // const   {register,handleSubmit} = useForm()
    const socket = socketIOClient(ENDPOINT);
    useEffect(()=>{
        socket.on("message", data =>{
            setMessage({message: data.message})
        })
        // socket.on("status", data =>{
        //     // setResponse(data.result)
        //     console.log(data)
        // })
        // socket.emit("status",{authorization:localStorage.getItem('authorization')})
        
    })
    const onSubmit = async (e) => {
        e.preventDefault()
        // console.log(messages.message)
        socket.emit('message', {id: message.id,message: messages.message})
    }
    console.log(message)
    return (
        <div>
            <div
                style={{
                    height: '75vh',
                    // width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    overflow: 'auto',
                    border: 'solid'
                }}
            >
                <p>{(message.firstname !== undefined)?message.firstname: ''} {(message.lastname !== undefined)?message.lastname:''}</p>
                {messages.message}
            </div>
            <div
                style={{
                    // display: 'flex',
                    // justifyContent: 'center',
                    height: '10vh',
                    // width: '100%',
                    // border: 'solid'
                }}
            >
                <Form onSubmit={onSubmit}>
                    <Form.Group as={Row} controlId='formHorizontalMessage'>
                        <Col sm={10}>
                            <Form.Control type="text" name="message" onChange={changeEvent => setMessage({message: changeEvent.target.value})}/>
                        </Col>
                    </Form.Group>
                    <Button variant="dark"  type='submit'   style={{width: '17vw', marginLeft: '2vw' ,marginTop: '3vh'}} block>Send</Button>
                </Form>
            </div>
        </div>
    )
}
