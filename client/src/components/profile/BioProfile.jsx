import React from 'react'
import {Button, Form, Col} from 'react-bootstrap'
import {useForm} from 'react-hook-form'

export const BioProfile = () => {
    const   [bio, setBio] = React.useState('')
    const   {register, handleSubmit} = useForm()

    const onload = async () => {
        await fetch('/user/getbio', {
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
            // console.log(data)
            setBio(data.userinfo)
        })
    }

    onload()
    const onSubmit = async (data) => {
        data.username = 'Pontsho'
        console.log(data)
        await fetch('/user/updatebio', {
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
            // console.log(value)
        })
    }
    return (
        <div style={{
            display: 'column',
            width: '60vw',
            marginTop: '3vh',
            marginLeft: '3vw'
        }}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Label column sm={2}>Bio!</Form.Label>
                    <Col sm={10}>
                        <Form.Control as="textarea" rows="10" name="bio" defaultValue={bio}  ref={register}/>
                    </Col>
                    <Button bg="dark"  type='submit' size='lg'  style={{width: '25vw', marginLeft: '15vw', marginTop: '3vh'}} block>Update Bio</Button>
                </Form>
        </div>
    )
}