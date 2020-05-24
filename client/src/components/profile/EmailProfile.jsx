import React from 'react'
import {Button, ButtonGroup, Form, Col, Row} from 'react-bootstrap'
import {useForm} from 'react-hook-form'

export const EmailProfile = () => {
    const   [email, setEmail] = React.useState('')
    const   {register, handleSubmit} = useForm()

    const onload = async () => {
        await fetch('/user/getemail', {
            method: 'POST',
            redirect: 'manual',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({username: 'Pontsho'})
        })
        .then (data => {
            return data.json()
        })
        .then (data => {
            console.log(data)
            setEmail(data.email)
        })
    }

    onload()
    
    const onSubmit = async (data) => {
        data.username = 'Pontsho'
        console.log(data)
        await fetch('/user/updateemail', {
            method: 'POST',
            redirect: 'manual',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
        .then (data => {
            return data.json()
        })
        .then (value =>{
            console.log(value)
        })
    }
    return (
        <div style={{
            display: 'column',
            // flexDirection: 'column',
            width: '60vw',
            marginTop: '3vh',
            marginLeft: '3vw',
            // paddingLeft: '2vw'
            // height: '50vh'
        }}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group as={Row} controlId='formHorizontalEmail'>
                        <Form.Label column sm={2}>EMAIL:</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" name="email" defaultValue={email} ref={register}/>
                        </Col>
                    </Form.Group>
                    <Button bg="dark"  type='submit' size='lg'  style={{width: '25vw', marginLeft: '19vw', marginTop: '3vh'}} block>Update Email</Button>

                </Form>
        </div>
    )
}