import React from 'react'
// import 'bootstrap/dist/css/bootstrap.css';
// import './style1.css';
import {useForm} from 'react-hook-form'
import {Form, Col, Row, Button} from 'react-bootstrap'


export const Register = (props) => {
    const { setRegister, handleExitRegister, setDisplay, setRegisterDisplay} = props
    const [duplicateMail, setDuplicateMail] =  React.useState(false);
    const [duplicateUsername, setDuplicateUsername] =  React.useState(false);
    const { register, handleSubmit, errors } = useForm()
    const onSubmit = async (data) => {
    // console.log(data)
      //checking if username is taken or not
      await fetch('/save', {
          method: 'POST',
          redirect: 'manual',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
      })
      .then(result => {
        return result.json()
      })
      .then (rt =>{
            console.log(rt)
            if (rt.data.result === 1){
                setRegisterDisplay('flex')
                setDisplay('flex')
                setRegister('Registration successful Please confirm you account from your email')
                handleExitRegister()
            }
            if (rt.result === 0){
            let ss 
            for(const key in rt.err){
                ss = (rt.err[key])
                if  (ss['email']) 
                    setDuplicateMail(true) 
                if (ss['username']) 
                    setDuplicateUsername(true)
            }
          }
      })
    };

    const errorMsgUname = () => {
      if (duplicateUsername){
          return(
              <small className="text-primary"> USERNAME ALREADY EXISTS</small>
          );            
      }
    }

    const errorMsgMail = () => {
      if (duplicateMail){
          return(
              <small className="text-primary"> EMAIL ALREADY EXISTS</small>
          );            
      }
    }

    return (
      <div 
        style={{
          width: '60vw',
          // display: 'flex',
          justifyContent: 'center',
          // marginLeft: '5vw',
          marginTop: '15vh'

        }}
      >
           <Form action="" onSubmit={handleSubmit(onSubmit)}>
               <h1 style={{marginLeft: '10vw'}}>Registration</h1><br />
               
                  { errorMsgUname() }
                  {errors.username && errors.username.type === 'required' && <div style={{marginLeft: '10vw'}}><small className="text-primary"> THIS FIELD IS REQUIRED</small></div>}
                  {errors.username && errors.username.type === 'minLength' && <div style={{marginLeft: '10vw'}}><small className="text-primary"> minimum length of 6 characters</small></div>}
               <Form.Group as={Row} controlId='formHorizontalUsername'>
                <Form.Label column sm={2}>USERNAME:</Form.Label>
                <Col sm={10}>
                  <Form.Control type="text" name="username" ref={register({required:true,minLength:6})} />
                </Col>
               </Form.Group>
                <Form.Row>
                  <br />
                </Form.Row>

                { errorMsgMail() }
                {errors.email && errors.email.type === 'required' && <div style={{marginLeft: '10vw'}}><small className="text-primary"> THIS FIELD IS REQUIRED</small></div>}
                {errors.email && errors.email.type === 'pattern' && <div style={{marginLeft: '10vw'}}><small className="text-primary"> INVALID EMAIL ADDRESS</small></div>}
              <Form.Group as={Row} controlId='formHorizontalEmail'>
                <Form.Label column sm={2}>
                  EMAIL:
                </Form.Label>
                <Col>
                  <Form.Control type="text" name="email" ref={register({required: true, pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i} })} />
                </Col>
              </Form.Group>
              <Form.Group>
                <br />
              </Form.Group>

                {errors.firstname && errors.firstname.type === 'required' && <div style={{marginLeft: '10vw'}}><small className="text-primary"> THIS FIELD IS REQUIRED</small></div>}
              <Form.Group as={Row} controlId='formHorizontalFirstName' >
                <Form.Label column sm={2}>FIRST NAME:</Form.Label>
                <Col>
                  <Form.Control type="text" name="firstname" ref={register({required:true})}/>
                </Col>
              </Form.Group>
              <Form.Group>
                <br />
              </Form.Group>

                {errors.lastname && errors.lastname.type === 'required' && <div style={{marginLeft: '10vw'}}><small className="text-primary"> THIS FIELD IS REQUIRED</small></div>}
              <Form.Group as={Row} controlId='fomrhorizontalLastname'>
                <Form.Label column sm={2}>LAST NAME:</Form.Label>
                <Col>
                  <Form.Control type="text" name="lastname" ref={register({required:true})}/>
                </Col>
              </Form.Group>
              <Form.Group>
                <br />
              </Form.Group>

                {errors.password && errors.password.type === 'required' && <div style={{marginLeft: '10vw'}}><small className="text-primary"> THIS FIELD IS REQUIRED</small></div>}
                {errors.password && errors.password.type === 'pattern' && <div style={{marginLeft: '10vw'}}><small className="text-primary"> Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters</small></div>}
              <Form.Group as={Row} controlId='formhorizontalPassword'>
               <Form.Label column sm={2}>PASSWORD:</Form.Label>
              <Col>
                <Form.Control type="password" name="password" ref={register({required:true, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/})} />
              </Col>
              </Form.Group>
              <Form.Group>
                <br />
              </Form.Group>
              <Button variant='primary' type='submit' size='lg'  style={{width: '50vw', marginLeft: '10vw'}} block>Sign Up</Button>
           </Form>
       </div>
   )     
}