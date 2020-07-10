import React from 'react'
import {Card} from 'react-bootstrap'
import { faTimes, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const MoreInfo = (props) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                // color: 'white',
                position: 'fixed',
                paddingTop: '5vh'
            }}
        >
            <div>
                <Card style={{ width: '40rem', height: '40rem' }}>
                    <Card.Img  src="" width='200' height='200' />
                    <Card.Body>
                        <Card.Title><h2>{props.info.firstname} {props.info.lastname}</h2></Card.Title>
                        <div>
                            <br/>
                            <div>
                                <h3>Age</h3>
                                <div>{props.info.age}</div>
                            </div>
                            <div>
                                <h3>Gender</h3>
                                <div>{props.info.gender}</div>
                            </div>
                            <div>
                                <h3>Bio</h3>
                                <div>{props.info.bio}</div>
                            </div>
                            <div>
                                <h3>Interests</h3>
                                <div>{props.info.interest}</div>
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faThumbsDown} size='2x' />
                                <FontAwesomeIcon icon={faThumbsUp} style={{marginLeft: '2vw'}} size='2x' />
                            </div>
                        </div>
                        
                    </Card.Body>
                </Card>
            </div>
            <div
                style={{
                    marginLeft: '10vw',
                    color: 'white'
                }}
                onClick={props.handleExit}
            >
                <FontAwesomeIcon icon={faTimes} size='3x' />
            </div>
        </div>
    )
}
