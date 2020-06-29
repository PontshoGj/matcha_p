import React from 'react'
import {useForm} from 'react-hook-form'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import {Button, Form, Col, Row} from 'react-bootstrap'

export const AdvancedMatch = () => {
    const   {register, handleSubmit} = useForm()
    const   [ value, setValue ] = React.useState(0); 

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '5vh'
            }}
        >
            <Form>
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
                            width: '40%'
                        }}
                    >
                        <div><Form.Label column><h3>Distance</h3></Form.Label></div>
                    
                        <RangeSlider
                            value={value}
                            onChange={changeEvent => setValue(Number(changeEvent.target.value))}
                            tooltip='on'
                            step={10}
                        />
                    </div>
                    <div
                        style={{
                            display: 'colum',
                            justifyContent: 'center'
                        }}
                    >
                        <Form.Label column><h3>Age Range</h3></Form.Label>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '60%'
                            }}
                        >
                            <RangeSlider
                                value={value}
                                onChange={changeEvent => setValue(Number(changeEvent.target.value))}
                                tooltip='on'
                                step={10}
                            />
                            <RangeSlider
                                value={value}
                                onChange={changeEvent => setValue(Number(changeEvent.target.value))}
                                tooltip='on'
                                step={10}
                            />
                        </div>
                    </div>
                </div>
                <div>
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
            </Form>
        </div>
    )
}
