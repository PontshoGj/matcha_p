import React from 'react'
import {Card, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp, faBars, faEllipsisH } from '@fortawesome/free-solid-svg-icons'

export const Suggest = (props) => {
    const show = () =>{
        props.handleDisplay();
        props.setInfo(props.info);
    }
    return (
        <div
            style={{
                display: 'flex',
                padding: '3rem'
            }}
        >

            <div>
                <Card style={{ width: '18rem' }} >
                    <Card.Img variant="top" src="" width='180' height='180' />
                    <Card.Body>
                        <Card.Title>{props.info.firstname} {props.info.lastname}</Card.Title>
                        <div>
                            <FontAwesomeIcon icon={faThumbsDown} size='2x' />
                            <FontAwesomeIcon icon={faThumbsUp} style={{marginLeft: '2vw'}} size='2x' />
                            {/* <Button>like</Button> */}
                            {/* <Button>unlke</Button> */}
                        </div>
                        <div style={{marginTop: '1vh'}}>
                            {/* <Button variant="primary" onClick={show}> Show More</Button> */}
                            <FontAwesomeIcon icon={faEllipsisH}  onClick={show} size='2x' />
                            <FontAwesomeIcon icon={faEllipsisH}  onClick={show} size='2x' />
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
