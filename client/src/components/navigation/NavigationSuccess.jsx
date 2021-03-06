import React, { Component } from 'react'
import {Nav, Navbar } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faSignOutAlt, faUserFriends, faHome, faHeart , faFlag} from '@fortawesome/free-solid-svg-icons'

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
                        <Navbar.Brand onClick={this.props.changeProfile} href="#Profile">Matcha</Navbar.Brand>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav className="mr-auto">
                                <Nav.Link onClick={this.props.changeProfile} href="#Profile">
                                    <FontAwesomeIcon icon={faHome} size='2x' />
                                </Nav.Link>
                                <Nav.Link onClick={this.props.changeMatch}  href="#match">
                                    <FontAwesomeIcon icon={faHeart} size='2x' />
                                </Nav.Link>
                                <Nav.Link onClick={this.props.changeFriends} href="#friends">
                                    <FontAwesomeIcon icon={faUserFriends} size='2x' />
                                </Nav.Link>
                                <Nav.Link onClick={this.props.changeMessage}  href="#messsage">
                                    <FontAwesomeIcon icon={faEnvelope} size='2x' />
                                </Nav.Link>
                                <Nav.Link onClick={this.props.changeLog} href="#signout">
                                    <FontAwesomeIcon icon={faSignOutAlt} size='2x' />
                                </Nav.Link>
                                <Nav.Link onClick={this.props.changeNotif} href="#notif">
                                    <FontAwesomeIcon icon={faFlag} size='2x' />
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
