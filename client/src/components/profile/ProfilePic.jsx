import React, { useContext } from 'react'
import {Button, Form, Col, Row} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {GlobalContext} from '../../context/GlobalState'
import {Card} from 'react-bootstrap'

export const ProfilePic = () => {
    const   {setLog} = useContext(GlobalContext)
    const    [im, setImages] = React.useState(<img />)

   const onload = async () => {
        await fetch('/getImage', {
            method: 'POST',
            redirect: 'manual',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'authorization': `bearer ${localStorage.getItem('authorization')}` 
            },
        })
        .then (data => {
            if(data.status === 403) throw data
            return data.json()
        })
        .then (data => {
            // console.log(data.img[0])
            // setImages( <img src={data.img[0]} />)
            // console.log(im)
        })
        .catch(err =>{
            if (err.status === 403)
                setLog(false)
        })
    }

    onload()
    return (
        <div
            style={{
                margin: '5rem'
            }}
        >
            <Card style={{ width: '40rem' }}>
                <Card.Body>
                    {im}
                </Card.Body>
            </Card>
        </div>
    )
}
