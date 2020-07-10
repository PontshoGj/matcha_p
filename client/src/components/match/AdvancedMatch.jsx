import React from 'react'
import {useForm} from 'react-hook-form'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import {Button, Form, Col, Row} from 'react-bootstrap'
import  {Suggest} from './Suggest'

export const AdvancedMatch = ({setDisplay, handleDisplay, setInfo}) => {
    const   {register, handleSubmit} = useForm()
    const   [ distance, setDistance ] = React.useState(1); 
    const   [ minage, setMinage ] = React.useState(18); 
    const   [ maxage, setMaxage ] = React.useState(0); 

    const onSubmit = async (data) =>{
        let newInterest ='['
        let i = data.interest.length, j = 1
        data.interest.forEach(value => {
            newInterest = newInterest + '"' + value + '"'
            if (j++ < i)
                newInterest = newInterest  + ','
        })
        newInterest = newInterest + ']'
        data.interest = newInterest
        data.distance = distance
        data.minage = minage
        data.maxage = maxage
        // console.log(data)
        await fetch('/match/getMatch',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
              'authorization': `bearer ${localStorage.getItem('authorization')}` 
            },
            body: JSON.stringify(data)
        })
        .then (data =>{
            if(data.status === 403) throw data
            return data.json()
        })
        .then (data => {
            console.log(data)
            let i= 0;
            let holdInfo = data.info.map(data => {
                return <Suggest handleDisplay={handleDisplay}  info={data} setInfo={setInfo} key={i++}/>
            })
            setDisplay(holdInfo)
        })
        .catch (err =>{
            console.log(err)
        })
    }
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '5vh'
            }}
        >
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
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
                </div>
                <div
                    style={{
                        marginTop: '5vh'
                    }}
                >
                    <Form.Label column><h3>Interests: 3 MIN</h3></Form.Label>
                    <Form.Group as={Row} controlId='formHorizontalInterests'>
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

                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Button variant="dark" type='submit' size='lg'  style={{width: '25vw', marginTop: '3vh'}} block>Search</Button>
                </div>
            </Form>
        </div>
    )
}
