import React, { Component } from 'react'
import {Nav, Navbar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faSignOutAlt, faUserFriends, faHome, faHeart } from '@fortawesome/free-solid-svg-icons'

export default class NavigationSuccess extends Component {
    render() {
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
                        <Navbar.Brand href="#Profile">Matcha</Navbar.Brand>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav className="mr-auto">
                                <Nav.Link  href="#Profile">
                                    <FontAwesomeIcon icon={faHome} size='2x' />
                                </Nav.Link>
                                <Nav.Link  href="#match">
                                    <FontAwesomeIcon icon={faHeart} size='2x' />
                                </Nav.Link>
                                <Nav.Link href="#firends">
                                    <FontAwesomeIcon icon={faUserFriends} size='2x' />
                                </Nav.Link>
                                <Nav.Link href="#messsage">
                                    <FontAwesomeIcon icon={faEnvelope} size='2x' />
                                </Nav.Link>
                                <Nav.Link href="#signout">
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
