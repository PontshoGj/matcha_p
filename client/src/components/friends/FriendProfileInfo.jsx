import React from 'react'
import {Card, Button} from 'react-bootstrap'
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
                    <Card.Img  src="holder.js/100px180" width='200' height='200' />
                    <Card.Body>
                        <Card.Title>{data.name}</Card.Title>
                        <Card.Text>
                        <div>
                            <div>
                                Bio
                                {data.bio}
                            </div>
                            <div>
                                Interests
                                {data.interest}
                            </div>
                        </div>
                        
                        </Card.Text>
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
