import React from 'react'
import {Card} from 'react-bootstrap'

export const Mes = ({message, who, firstname, lastname}) => {
    let float = (who === 'you')?'left':'right'
    let name = (who === 'you')?'you':`${firstname} ${lastname}`
    return (
        <div
            style={{
                // display: 'column',
                float: float,
                marginTop: '1vh',
                width: '90vw',
                textAlign: 'center',
            }}
        >
            <Card style={{width: '30vw', float: float}}>
                <Card.Body>
                    <div>{name}</div>
                    <div>{message}</div>
                </Card.Body>
            </Card>
        </div>
    )
}
