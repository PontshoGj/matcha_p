import React, {useEffect} from 'react'
import {Button, Form, Col, Row} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
// import socketIOClient from "socket.io-client";

export const Messages = ({message, socket}) => {
    const   [messages, setMessage] = React.useState({})
    const   {register,handleSubmit} = useForm()
    useEffect(()=>{
        socket.on("message", data =>{
            setMessage({message: data.message})
        })
    })
    const onSubmit = async (data) => {
        // console.log(data)
        socket.emit('message', {id: message.id, message: data.message})
    }
    console.log(message)
    return (
        <div>
            <div
                style={{
                    height: '75vh',
                    width: '100%',
                    display: 'column',
                    flexWrap: 'wrap',
                    overflow: 'auto',
                    border: 'solid'
                }}
            >
                {messages.message}
            </div>
            <div
                style={{
                    // display: 'flex',
                    // justifyContent: 'center',
                    height: '10vh',
                    width: '100%',
                    // border: 'solid'
                }}
            >
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group as={Row} controlId='formHorizontalMessage'>
                        <Col sm={10}>
                            <Form.Control type="text" name="message" ref={register}/>
                        </Col>
                    </Form.Group>
                    <Button>Send</Button>
                </Form>
            </div>
        </div>
    )
}
