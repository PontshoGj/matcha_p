import React from 'react'
import {Card} from 'react-bootstrap'

export const Dis = ({message}) => {
    return (
        <div
            style={{
                display: 'column',
                // float: float,
                marginTop: '1vh',
                width: '90vw',
                textAlign: 'center',
            }}
        >
            <Card >
                <Card.Body>
                    <div>{message}</div>
                </Card.Body>
            </Card>
        </div>
    )
}
