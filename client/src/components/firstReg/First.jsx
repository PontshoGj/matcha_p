import React, {useContext} from 'react'
import {Button, Form, Col, Row} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {GlobalContext} from '../../context/GlobalState'
import { Second } from './Second'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';

export const First = ({setDisplay}) => {
    const   {setLog} = useContext(GlobalContext)
    const   [age, setAge] = React.useState('')
    const   [gender, setGender] = React.useState('')
    const   [race, setRace] = React.useState('')
    const   {register, handleSubmit} = useForm()
    const   [ distance, setDistance ] = React.useState(1); 
    const   [ minage, setMinage ] = React.useState(18); 
    const   [ maxage, setMaxage ] = React.useState(0); 

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
        data.minage = minage
        data.maxage = maxage
        data.distance = distance
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
                <Form.Group>
                    <div
                        style={{
                            display: 'colum',
                            justifyContent: 'center',
                        }}
                    >
                        <Form.Label column><h3>Age Range</h3></Form.Label>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                // width: '60%'
                            }}
                        >
                            <RangeSlider
                                value={minage}
                                onChange={changeEvent => setMinage(Number(changeEvent.target.value))}
                                tooltip='on'
                                step={5}
                                size='lg'
                                name="minage"
                                min={18}
                                max={88}
                            />
                            <RangeSlider
                                value={maxage}
                                onChange={changeEvent => setMaxage(Number(changeEvent.target.value))}
                                tooltip='on'
                                step={5}
                                size='lg'
                                name="maxage"
                                min={minage}
                                max={88}
                            />
                        </div>
                    </div>
                </Form.Group>
                <Form.Group>
                    <div
                        style={{
                            display: 'colum',
                            justifyContent: 'center',
                            marginRight: '2vw',
                            // width: '40%'
                        }}
                    >
                        <div><Form.Label column><h3>Distance</h3></Form.Label></div>
                    
                        <RangeSlider
                            value={distance}
                            onChange={changeEvent => setDistance(Number(changeEvent.target.value))}
                            tooltip='on'
                            step={5}
                            size='lg'
                            name="distance"
                            min={1}
                        />
                    </div>
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
