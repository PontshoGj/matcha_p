import React from 'react'
import {Card, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp, faBars, faEllipsisH } from '@fortawesome/free-solid-svg-icons'

export const FriendProfile = ({handleDisplay, setData,data}) => {
    const handleOnClick = () =>{
        handleDisplay()
        setData(data);
    }
    return (
        <div
            style={{
                display: 'flex',
                padding: '3rem'
            }}
        >

            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="" width='180' height='180' />
                    <Card.Body>
                        <Card.Title>{data.firstname} {data.lastname}</Card.Title>
                        <div style={{marginTop: '1vh'}}>
                            <FontAwesomeIcon icon={faEllipsisH}  onClick={handleOnClick} size='2x' />
                            <FontAwesomeIcon icon={faEllipsisH}  onClick={handleOnClick} size='2x' />
                        </div>
                        {/* <Button variant="primary" onClick={handleOnClick}> Show More</Button> */}
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
