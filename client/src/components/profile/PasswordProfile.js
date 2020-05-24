import React from 'react'
import {Button, ButtonGroup, Form, Col, Row} from 'react-bootstrap'

export const PasswordProfile = () => {
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
                    <Form.Group as={Row} controlId='formHorizontalPassword'>
                        <Form.Label column sm={2}>Enter new password:</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" name="password" id="password"/>
                        </Col>
                    </Form.Group>
                    <Button bg="dark"  type='submit' size='lg'  style={{width: '25vw', marginLeft: '5vw', marginTop: '3vh'}} block>Update Password</Button>
                </Form>
        </div>
    )
}