import React, { Component } from 'react'
import {Nav, Navbar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
// import {Message} from '../message/Message'

export default class Navigation extends Component {
    render() {
        const changeLog = () =>{
            localStorage.removeItem('authorization')
            localStorage.removeItem('id')
            localStorage.removeItem('firstinput')
            localStorage.removeItem('log')
        }
        return (
            <div
                style={{
                    display: 'flex',
                    // justifyContent: 'center',
                    height: '10vh',
                    // position: 'fixed',
                    width: '100%',
                    // border: 'solid',
                    // marginTop: '4vh',
                    // paddingTop: '80vh',
                    // padding: '0',
                    // position: 'top',
                }}
            >
                <>
                    <Navbar bg="dark" variant="dark" style={{width: '100%'}}>
                        <Navbar.Brand onClick={this.props.changeProfile} href="#Profile">Matcha</Navbar.Brand>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav className="mr-auto">
                                <Nav.Link onClick={changeLog} href="#signout">
                                    <FontAwesomeIcon icon={faSignOutAlt} size='2x' />
                                </Nav.Link>

                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <br />
                </>
            </div> 
        )
    }
}
