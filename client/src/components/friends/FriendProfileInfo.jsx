import React from 'react'
import { Card } from 'react-bootstrap'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const FriendProfileInfo = ({data, handleExit}) => {
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
                        <Card.Title><h2>{data.firstname} {data.lastname}</h2></Card.Title>
                        <div>
                            <br/>
                            <div>
                                <h3>Age</h3>
                                <div>{data.age}</div>
                            </div>
                            <div>
                                <h3>Gender</h3>
                                <div>{data.gender}</div>
                            </div>
                            <div>
                                <h3>Bio</h3>
                                <div>{data.bio}</div>
                            </div>
                            <div>
                                <h3>Interests</h3>
                                <div>{data.interest}</div>
                            </div>
                            <div>
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
                onClick={handleExit}
            >
                <FontAwesomeIcon icon={faTimes} size='3x' />
            </div>
        </div>
    )
}
