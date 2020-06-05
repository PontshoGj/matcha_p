import React, { useContext } from 'react'
import {Button, Form, Col, Row} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {GlobalContext} from '../../context/GlobalState'

export const PasswordProfile = () => {
    const   {setLog} = useContext(GlobalContext)
    const   {register, handleSubmit} = useForm()
    const onSubmit = async (data) => {
        data.username = 'Pontsho'
        console.log(data)
        await fetch('/user/updatepassword', {
            method: 'POST',
            redirect: 'manual',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'authorization': `bearer ${localStorage.getItem('authorization')}` 
            },
            body: JSON.stringify(data)
        })
        .then (data => {
            if(data.status === 403) throw data
            return data.json()
        })
        .then (value =>{
            console.log(value)
        })
        .catch(err =>{
            if (err.status === 403)
                setLog(false)
        })
    }
    return (
        <div style={{
            display: 'column',
            width: '60vw',
            marginTop: '3vh',
            marginLeft: '3vw',
        }}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group as={Row} controlId='formHorizontalPassword'>
                        <Form.Label column sm={2}>Enter new password:</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" name="password" ref={register}/>
                        </Col>
                    </Form.Group>
                    <Button variant="dark"  type='submit' size='lg'  style={{width: '25vw', marginLeft: '19vw', marginTop: '3vh'}} block>Update Password</Button>
                </Form>
        </div>
    )
}