import React from 'react'
import {Button, Form, Col, Row} from 'react-bootstrap'

export const BioProfile = () => {
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
                    <Form.Label column sm={2}>Bio!</Form.Label>
                    <Col sm={10}>
                        <Form.Control as="textarea" rows="10" name="bio" />
                    </Col>
                    <Button bg="dark"  type='submit' size='lg'  style={{width: '25vw', marginLeft: '5vw', marginTop: '3vh'}} block>Update Bio</Button>

                </Form>
        </div>
    )
}