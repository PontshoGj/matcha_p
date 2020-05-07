import {Card} from 'react-bootstrap'
import React, { Component } from 'react'

export default class Friends extends Component {
    render() {
        return (
            <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                // justifyContent: 'center',
                width: '20rem',
                height: '100vh',
                border: 'solid',
                // position: 'fixed'
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
