import React from 'react'
import {Card, Button} from 'react-bootstrap'


export const FriendProfile = ({handleDisplay, setData,data}) => {
    const handleOnClick = () =>{
        handleDisplay()
        setData({name: "Mogwere Pontsho"});
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
                        <Card.Title>{data.name}</Card.Title>
                        <Button variant="primary" onClick={handleOnClick}> Show More</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
