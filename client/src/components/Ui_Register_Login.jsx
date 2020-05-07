import React, { useState } from 'react'
import {Button} from 'react-bootstrap'
import Navigation from './navigation/Navigation'
import Footer from './footer/Footer'
import {Register} from './register/Register'
import {Login} from './login/Login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export const Ui_Register_Login = (props) => {
        const [modeVisible, setModeVisible] = useState(false);
        const {setLogin} = props
        const [RegisterDisplay, setRegisterDisplay] = useState('none');
        const [register, setRegister] = useState('')
        const [Loging, setLoging] = useState('none');
        const handleRegister = () =>{
            setRegisterDisplay('flex')
        }
        const handleLoging = () =>{
            setLoging('flex')
        }
        const handleExitRegister = () =>{
            setRegisterDisplay('none')
        }
        const handleExitLoging = () =>{
            setLoging('none')
        }
        
        return (
            <div style={{
                display: 'flex  ',
                flexDirection: 'column',
                justifyContent: 'center',
            }}>
                <Navigation />
                <div
                    style={{
                        marginTop: '30vh'
                    }}
                >
                    <Button onClick={handleRegister} style={{width: '20vw'}}>Register</Button>
                    <Button onClick={handleLoging}style={{width: '20vw', marginLeft: '5vw'}}>Login</Button>
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
                            setModeVisible={setModeVisible}
                            setRegister={setRegister}
                            handleExitRegister={handleExitRegister}
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
