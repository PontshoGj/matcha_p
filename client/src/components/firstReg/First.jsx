import React, {useContext} from 'react'
import {Button, Form, Col, Row} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {GlobalContext} from '../../context/GlobalState'
import { Second } from './Second'

export const First = ({setDisplay}) => {
    const   {setLog} = useContext(GlobalContext)
    const   [age, setAge] = React.useState('')
    const   [gender, setGender] = React.useState('')
    const   [race, setRace] = React.useState('')
    const   {register, handleSubmit} = useForm()

    const onSubmit = async (data) => {
        let newInterest ='{'
        let i = data.interest.length, j = 1
        data.interest.forEach(value => {
            newInterest = newInterest + '\'' + value + '\''
            if (j++ < i)
                newInterest = newInterest  + ','
        })
        newInterest = newInterest + '}'
        data.interest = newInterest
        console.log(data)
        setAge(data.age)
        setGender(data.gender)
        setRace(data.race)
        await fetch('/user/first', {
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
            if (value.result)
                setDisplay(<Second setDisplay={setDisplay}/>)
        })
        .catch (err => {
            if (err.status === 403)
                setLog(false)
        })
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group as={Row} controlId='formHorizontalAge'>
                    <Form.Label column sm={2}>AGE:</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" name="age" defaultValue={age} ref={register}/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId='formHorizontalRace'>
                    <Form.Label column sm={2}>Race:</Form.Label>
                    <Col sm={10}>
                        <Form.Control type="text" name="race" defaultValue={race} ref={register}/>
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
            
                <Button variant="dark" type='submit'  style={{width: '17vw', marginLeft: '11.5vw', marginTop: '3vh'}} block>Next</Button>

            </Form>
        </div>
    )
}
