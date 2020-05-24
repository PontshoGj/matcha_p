import React from 'react'
import {Button, Form, Col, Row} from 'react-bootstrap'

export const EditProfile = () => {
    return (
        <div style={{
            display: 'column',
            // flexDirection: 'column',
            width: '60vw',
            borderLeft: 'solid .1vw',
            marginTop: '3vh',
            marginLeft: '5vw'
            // height: '50vh'
        }}>
                <Form action="">
                    <Form.Group as={Row} controlId='formHorizontalFirstName'>
                        <Form.Label column sm={2}>FIRST NAME:</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" name="firstname" id="firstname"/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId='formHorizontalLastName'>
                        <Form.Label column sm={2}>LAST NAME:</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" name="lastname" id="lastname"/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId='formHorizontalGender'>
                        <Form.Label column sm={2}>Looking For?</Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select">
                                <option value="male" >male looking for a female</option>
                                <option value="female">female looking for a male</option>
                                <option value="gay">male looking for a male</option>
                                <option value="lesbian">female looking for a female</option> 
                                <option value="Bisexuelle">looking for male and female</option> 
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId='formHorizontalInterests'>
                        <Form.Label column sm={2}>Interests: <small>3 MIN</small></Form.Label>
                        <Col sm={10}>
                            <Form.Check type="checkbox" label="open" inline />
                            <Form.Check type="checkbox" label="introvert" inline/>
                            <Form.Check type="checkbox" label="trusty" inline/>
                            <Form.Check type="checkbox" label="commited" inline/>
                            <Form.Check type="checkbox" label="flirty" inline/>
                            <Form.Check type="checkbox" label="ambitious" inline/>
                            <Form.Check type="checkbox" label="calm" inline/>
                            <Form.Check type="checkbox" label="adventurous" inline/>
                            <Form.Check type="checkbox" label="traveller" inline/>
                            <Form.Check type="checkbox" label="lusty" inline/>
                        </Col>
                    </Form.Group>
               
                    <Button bg="dark" type='submit' size='lg'  style={{width: '25vw', marginLeft: '5vw', marginTop: '3vh'}} block>Update</Button>

            </Form>
        </div>
    )
}
