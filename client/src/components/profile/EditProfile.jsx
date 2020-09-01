import React, {useContext} from 'react'
import {Button, Form, Col, Row} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {GlobalContext} from '../../context/GlobalState'

// import { parse } from '@fortawesome/fontawesome-svg-core';

export const EditProfile = () => {
    const   {setLog} = useContext(GlobalContext)
    const   [firstname, setFirstName] = React.useState('');
    const   [lastname, setLastName] = React.useState('');
    // const   [email, setEamil] = React.useState('');
    const   [age, setAge] = React.useState('')
    const   [gender, setGender] = React.useState('')
    // const   [clearF, setClearF] = React.useState('')
    const   {register, handleSubmit} = useForm()

    const onload = async () => {
        await fetch('/user/getuserinfo', {
            method: 'POST',
            redirect: 'manual',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'authorization': `bearer ${localStorage.getItem('authorization')}` 
            },
        })
        .then (data => {
            if(data.status !== 200) throw data
            return data.json()
        })
        .then (data => {
            // console.log(data.userinfo);
            if (data.result === -1)
                setLog(false)
            setFirstName(data.userinfo.firstname)
            setLastName(data.userinfo.lastname)
            // setEamil(data.userinfo.email)
            setAge(data.userinfo.age)
            setGender(data.userinfo.gender)
            setCheck(data.userinfo.interest)
            selectgender(data.userinfo.gender)
        })
        .catch(err => {
            // if (err === 403)
            //     setLog(false)
        })
    }
    if (gender === '')
        onload()
    const onSubmit = async (data) => {
        let newInterest ='['
        let i = data.interest.length, j = 1
        data.interest.forEach(value => {
            newInterest = newInterest + '"' + value + '"'
            if (j++ < i)
                newInterest = newInterest  + ','
        })
        newInterest = newInterest + ']'
        data.interest = newInterest
        await fetch('/user/updateinfo', {
            method: 'POST',
            redirect: 'manual',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'authorization': `bearer ${localStorage.getItem('authorization')}` 
            },
            body: JSON.stringify(data)
        })
        .then (data => {
            if(data.status !== 200) throw data
            return data.json()
        })
        .then (value =>{
            // console.log(value)
            // clearForm()
            if (value.result === -1)
                setLog(false)
        })
        .catch (err => {
            if (err.status === 403)
                setLog(false)
            // console.log(err);
        })
    }

    // const clearForm = () =>{
    //     let interest = clearF
    //     interest = interest.substring(1, interest.length - 1)
    //     interest = interest.split(',')
    //     interest.forEach(id => {
    //         id = id.trim()
    //         let value = id.substring(1, id.length - 1)
    //         document.getElementById(value).checked = false
    //     })
    // }
    const selectgender = gender => {
        document.getElementById(gender).selected = true
    }
    
    const setCheck = interest => {
            // setClearF(interest)
            interest = interest.substring(1, interest.length - 1)
            interest = interest.split(',')
            interest.forEach(id => {
                id = id.trim()
                let value = id.substring(1, id.length - 1)
                document.getElementById(value).checked = true
            })
    }
    return (
        <div style={{
            display: 'column',
            width: '60vw',
            marginTop: '3vh',
            marginLeft: '3vw'
            }}
        >
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group as={Row} controlId='formHorizontalFirstName'>
                    <Form.Label column sm={2}>FIRST NAME:</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" name="firstname" defaultValue={firstname} ref={register}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId='formHorizontalLastName'>
                    <Form.Label column sm={2}>LAST NAME:</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" name="lastname" defaultValue={lastname} ref={register}/>
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row} controlId='formHorizontalAge'>
                    <Form.Label column sm={2}>AGE:</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" name="age" defaultValue={age} ref={register}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId='formHorizontalGender'>
                    <Form.Label column sm={2}>Looking For?</Form.Label>
                    <Col sm={10}>
                        <Form.Control as="select" name='gender' defaultValue={gender} ref={register}>
                            <option value="male" id="male" >male looking for a female</option>
                            <option value="female" id="female">female looking for a male</option>
                            <option value="gay" id="gay">male looking for a male</option>
                            <option value="lesbian" id="lesbian">female looking for a female</option> 
                            <option value="Bisexuelle" id="Bisexuelle">looking for male and female</option> 
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId='formHorizontalInterests'>
                    <Form.Label column sm={2}>Interests: <small>3 MIN</small></Form.Label>
                    <Col sm={10}>
                        <Form.Check type="checkbox" ref={register} name="interest" id="open" value="open" label="open" inline />
                        <Form.Check type="checkbox" ref={register} name="interest" id="introvert" value="introvert" label="introvert" inline/>
                        <Form.Check type="checkbox" ref={register} name="interest" id="trusty" value="trusty" label="trusty" inline/>
                        <Form.Check type="checkbox" ref={register} name="interest" id="commited" value="commited" label="commited" inline/>
                        <Form.Check type="checkbox" ref={register} name="interest" id="flirty" value="flirty" label="flirty" inline/>
                        <Form.Check type="checkbox" ref={register} name="interest" id="ambitious" value="ambitious" label="ambitious" inline/>
                        <Form.Check type="checkbox" ref={register} name="interest" id="calm" value="calm" label="calm" inline/>
                        <Form.Check type="checkbox" ref={register} name="interest" id="adventurous" value="adventurous" label="adventurous" inline/>
                        <Form.Check type="checkbox" ref={register} name="interest" id="traveller" value="traveller" label="traveller" inline/>
                        <Form.Check type="checkbox" ref={register} name="interest" id="lusty" value="lusty" label="lusty" inline/>
                    </Col>
                </Form.Group>
            
                <Button variant="dark" type='submit' size='lg'  style={{width: '25vw', marginLeft: '19vw', marginTop: '3vh'}} block>Update</Button>

            </Form>
        </div>
    )
}
