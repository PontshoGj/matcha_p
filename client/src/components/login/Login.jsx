import React, {useContext} from 'react'
import {useForm, ErrorMessage} from 'react-hook-form'
import {Form, Col, Row, Button} from 'react-bootstrap'
import {GlobalContext} from '../../context/GlobalState'

export const Login = (props) => {
    const {addAuth, setLog, log} = useContext(GlobalContext);
    const { register, handleSubmit, errors } = useForm();
    const {setLogin} = props;
    const [incorrect, setIncorrect] =  React.useState(false);

    const onSubmit = async (data) => {
        // console.log(data)
        await fetch('/login', {
            method: 'POST',
            redirect: 'manual',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
        .then (result => {
            return result.json()
        })
        .then (data =>{
            // console.log(data)
            if (data.result === 1){
                addAuth(data.token)
                // console.log(localStorage.getItem('authorization'))
                setLog(true)
                console.log(log)
                // handleExitLoging()
            }else{
                setIncorrect(true)
            }
        })
      };
    const errorMessage = () =>{
        if (incorrect){
            return (<div style={{marginLeft: '10vw'}}>Incorrect Username or Password</div>)
        }
    }
    return (
        <div 
            style={{
                width: '60vw',
                justifyContent: 'center',
                marginTop: '15vh'
            }}
        >
            <Form  onSubmit={handleSubmit(onSubmit)}>
                <h1 style={{marginLeft: '10vw'}}>Login</h1><br />
                    {errorMessage()}
                    {errors.username && <div style={{marginLeft: '10vw'}}> This is required</div>}
                <Form.Group as={Row} controlId='formHorizontalUsername'>
                    <Form.Label column sm={2}>Username:</Form.Label>
                    <Col >
                        <Form.Control type="text" name="username" placeholder="E-Mail or Username" ref={register({required: true, minLength: 6})}/>
                    </Col>
                </Form.Group>
                <Form.Group>
                    <br />
                </Form.Group>

                    {errors.password && errors.password.type === 'required' && <div style={{marginLeft: '10vw'}}> This is required</div>}
                <Form.Group as={Row} controlId='fomrHorizontalPassword' >
                    <Form.Label column sm={2}>Password:</Form.Label>
                    <Col>
                        <Form.Control type="password" name="password" placeholder="Password" autoComplete="" ref={register({required:true, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/})}/>
                    </Col>
                </Form.Group>
                <Form.Group>
                    <br />
                </Form.Group>

                <Button variant='primary' size='lg'  type="submit" style={{width: '50vw', marginLeft: '10vw'}} block>Login</Button>
                <Form.Group>
                    <br />
                </Form.Group>
                <Button variant='secondary'  size='lg' style={{width: '50vw', marginLeft: '10vw'}} block>Reset Password</Button>

            </Form>
        </div>
    )
}