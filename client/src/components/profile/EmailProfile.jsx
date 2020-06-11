import React, { useContext } from 'react'
import {Button, Form, Col, Row} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {GlobalContext} from '../../context/GlobalState'

export const EmailProfile = () => {
    const   {setLog} = useContext(GlobalContext)
    const   [email, setEmail] = React.useState('')
    const   {register, handleSubmit} = useForm()

    const onload = async () => {
        await fetch('/user/getemail', {
            method: 'POST',
            redirect: 'manual',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'authorization': `bearer ${localStorage.getItem('authorization')}` 
            },
            body: JSON.stringify({username: 'Pontsho'})
        })
        .then (data => {
            if(data.status === 403) throw data
            return data.json()
        })
        .then (data => {
            // console.log(data)
            setEmail(data.email)
        })
        .catch(err =>{
            if (err.status === 403)
                setLog(false)
        })
    }

    onload()
    
    const onSubmit = async (data) => {
        // console.log(data)
        await fetch('/user/updateemail', {
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
            // console.log(value)
        })
        .catch(err =>{
            if (err.status === 403)
                setLog(false)
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
                    <Button variant="dark"  type='submit' size='lg'  style={{width: '25vw', marginLeft: '19vw', marginTop: '3vh'}} block>Update Email</Button>

                </Form>
        </div>
    )
}