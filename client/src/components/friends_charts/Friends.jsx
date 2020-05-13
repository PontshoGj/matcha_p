import {Card} from 'react-bootstrap'
import React, { Component } from 'react'

export default class Friends extends Component {
    render() {
        return (
            <div
            style={{
                // display: 'flex',
                flexDirection: 'column',
                // justifyContent: 'center',
                width: '15rem',
                height: '90vh',
                border: 'solid 1px',
                borderBottom: 'none',
                borderRight: 'none',
                borderTop: 'none'
                // position: 'fixed',
                // position: 'right',
                // marginTop: '7vh'
            }}
        >
            <Card>
                <Card.Body>This is some text within a card body.</Card.Body>
            </Card>
            <Card>
                <Card.Body>This is some text within a card body.</Card.Body>
            </Card>
            <Card>
                <Card.Body>This is some text within a card body.</Card.Body>
            </Card>
        </div>
        )
    }
}
