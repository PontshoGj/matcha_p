import React, { useContext } from 'react'
import {Button, Form, Col} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {GlobalContext} from '../../context/GlobalState'

export const BioProfile = () => {
    const   {setLog} = useContext(GlobalContext)
    const   [bio, setBio] = React.useState('')
    const   {register, handleSubmit} = useForm()

    const onload = async () => {
        await fetch('/user/getbio', {
            method: 'POST',
            redirect: 'manual',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'authorization': `bearer ${localStorage.getItem('authorization')}` 
            },
        })
        .then (data => {
            if(data.status === 403) throw data
            return data.json()
        })
        .then (data => {
            setBio(data.userinfo)
        })
        .catch(err =>{
            if (err.status === 403)
                setLog(false)
        })
    }

    onload()
    const onSubmit = async (data) => {
        // console.log(data)
        await fetch('/user/updatebio', {
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
        .catch (err =>{
            if (err.status === 403)
                setLog(false)
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
                    <Button variant="dark"  type='submit' size='lg'  style={{width: '25vw', marginLeft: '15vw', marginTop: '3vh'}} block>Update Bio</Button>
                </Form>
        </div>
    )
}