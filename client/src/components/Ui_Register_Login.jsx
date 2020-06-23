import React, { useState } from 'react'
import {Button} from 'react-bootstrap'
import Navigation from './navigation/Navigation'
import Footer from './footer/Footer'
import {Register} from './register/Register'
import {Login} from './login/Login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {Messages} from './errorsAndmessages/Messages'

export const Ui_Register_Login = (props) => {
        const {setLogin} = props
        const [RegisterDisplay, setRegisterDisplay] = useState('none');
        const [register, setRegister] = useState('')
        const [Loging, setLoging] = useState('none');
        const [display, setDisplay] = useState('none')
        
        const handleRegister = () =>{
            setRegisterDisplay('flex')
        }

        const handleLoging = () =>{
            setLoging('flex')
        }

        const handleExitRegister = () =>{
            setRegisterDisplay('none')
            console.log("no this")
        }

        const handleExitLoging = () =>{
            setLoging('none')
        }
        
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}>
                <Navigation />
                <div
                    style={{
                        marginTop: '10vh'
                    }}
                >
                    <Messages message={register} display={display}/>
                </div>
                <div
                    style={{
                        marginTop: '20vh'
                    }}
                >
                    <Button variant="dark" onClick={handleRegister} style={{width: '20vw'}}>Register</Button>
                    <Button variant="dark" onClick={handleLoging}style={{width: '20vw', marginLeft: '5vw'}}>Login</Button>
                </div>
                    <div
                        style={{
                            display: RegisterDisplay,
                            justifyContent: 'center',
                            width: '100%',
                            height: '100%',
                            top: '0',
                            left: '0',
                            right: '0',
                            bottom: '0',
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            color: 'white',
                            position: 'fixed'
                        }}
                    >
                        <div>
                            <Register
                                setRegisterDisplay={setRegisterDisplay}
                                setRegister={setRegister}
                                handleExitRegister={handleExitRegister}
                                setDisplay={setDisplay}
                            />
                        </div>
                        <div
                            style={{
                                marginLeft: '10vw'
                            }}
                            onClick={handleExitRegister}
                        >
                            <FontAwesomeIcon icon={faTimes} size='6x' />
                        </div>
                    </div>
                    <div
                        style={{
                            display: Loging,
                            justifyContent: 'center',
                            width: '100%',
                            height: '100%',
                            top: '0',
                            left: '0',
                            right: '0',
                            bottom: '0',
                            position: 'fixed',
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            color: 'white',
                        }}
                    >
                        <div>
                            <Login 
                                handleExitLoging={handleExitLoging}
                                setLogin={setLogin}
                            />
                        </div>
                        <div
                            style={{
                                marginLeft: '10vw'
                            }}
                            onClick={handleExitLoging}
                        >
                            <FontAwesomeIcon icon={faTimes} size='6x' />
                        </div>
                    </div>
                <Footer />
            </div>
        )
}
