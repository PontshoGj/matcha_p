import React from 'react'
import {useForm} from 'react-hook-form'
import {Form, Col, Row, Button} from 'react-bootstrap'

export const Passreset = (props) => {
    const { register, handleSubmit} = useForm();
    const {setRegister, setDisplay, handleExitReset2} = props;

    const onSubmit = async (data) => {
        console.log(data)
        await fetch('/passwordreset', {
            method: 'POST',
            redirect: 'manual',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(data)
        })
        .then (result => {
            console.log(result)
            return result.json()
        })
        .then (data =>{
            console.log(data)
            if (data.result === 1){
                    setRegister("Password Reset check you email")
                    setDisplay('flex')
                    handleExitReset2()
            }
        })
      };
    return (
        <div 
            style={{
                width: '60vw',
                justifyContent: 'center',
                marginTop: '15vh'
            }}
        >
            <Form  onSubmit={handleSubmit(onSubmit)}>
                <h1 style={{marginLeft: '10vw'}}>Reset Password</h1><br />

                <Form.Group as={Row} controlId='fomrHorizontalEmail' >
                    <Form.Label column sm={2}>Email</Form.Label>
                    <Col>
                        <Form.Control type="email" name="email" ref={register}/>
                    </Col>
                </Form.Group>
                <Form.Group>
                    <br />
                </Form.Group>
                <Button variant='primary' size='lg'  type="submit" style={{width: '50vw', marginLeft: '10vw'}} block>Login</Button>
            </Form>
        </div>
    )
}