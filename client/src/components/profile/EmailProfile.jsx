import React from 'react'
import {Button, ButtonGroup, Form, Col, Row} from 'react-bootstrap'

export const EmailProfile = () => {
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
                    <Form.Group as={Row} controlId='formHorizontalEmail'>
                        <Form.Label column sm={2}>EMAIL:</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" name="email" id="email"/>
                        </Col>
                    </Form.Group>
                    <Button bg="dark"  type='submit' size='lg'  style={{width: '25vw', marginLeft: '5vw', marginTop: '3vh'}} block>Update Email</Button>

                </Form>
        </div>
    )
}