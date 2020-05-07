import React, { Component } from 'react'
import {Card} from 'react-bootstrap'



export default class Chart extends Component {
    render() {
        return (
            <div
                style={{
                    // display: 'flex',
                    width: '20rem',
                    border: 'solid',
                    height: '4vh',
                    marginTop: '96vh',
                    // position: 'fixed'
                }}
            >
                 <Card>
                    <Card.Title>Chart</Card.Title>
                </Card>                
            </div>
        )
    }
}
