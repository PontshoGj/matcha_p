import React from 'react'
import {Card, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'

export const User = ({data, setMessage}) => {
    const setdata = () =>{
        // console.log(data)
        setMessage(data)
    }
    return (
        <div
            style={{
                marginTop: '1vh'
            }}
            onClick={setdata}
        >
            <Card style={{ width: '90%' }}>
                <Card.Body>
                    {/* <Card.Title> */}
                    <div
                        style={{
                            display: 'flex'
                        }}
                    >
                        <div
                            style={{
                                width: '90%'
                            }}
                        >
                            {data.firstname} {data.lastname}
                        </div>
                        <div
                            style={{
                                width: '10%'
                            }}
                        >
                            <FontAwesomeIcon icon={faComment} size='1x' />
                        </div>
                    </div>
                    {/* </Card.Title> */}
                </Card.Body>
            </Card>
        </div>
    )
}
