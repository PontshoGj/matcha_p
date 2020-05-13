import React, { Component } from 'react'
import {Card} from 'react-bootstrap'



export default class Chart extends Component {
    render() {
        return (
            <div
                style={{
                    // display: 'flex',
                    // justifyContent: 'flex-end',
                    width: '20rem',
                    border: 'solid',
                    height: '4vh',
                    // marginTop: '50vh',
                    // marginRight: '15vw',
                    // position: 'fixed',
                    // position: 'absolute',
                    bottom: '1vh'
                }}
            >
                 <Card>
                    <Card.Title>Chart</Card.Title>
                </Card>                
            </div>
        )
    }
}
