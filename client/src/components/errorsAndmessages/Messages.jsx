import React from 'react'
import {Alert} from 'react-bootstrap'

export const Messages = (props) => {
    return (
        <div
            style={{
                display: props.display
            }}
        >
            <Alert variant="success">
                {props.message}
            </Alert>
        </div>
    )
}
