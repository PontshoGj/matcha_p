import React from 'react'
import {Card} from 'react-bootstrap'

export const Ut = ({message, id, onload}) => {
    const click = async ()=>{
            await fetch('/user/delete',{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                  'authorization': `bearer ${localStorage.getItem('authorization')}` 
                },
                body: JSON.stringify({id: id})
            })
            .then (data =>{
                if(data.status === 403) throw data
                return data.json()
            })
            .then (dat => {
                // console.log(data)
                if (dat.result){
                    onload()
                }
            })
            .catch (err =>{
                // console.log(err)
            })
    
    }
    return (
        <div
            style={{
                // display: 'column',
                // float: float,
                marginTop: '1vh',
                width: '90vw',
                textAlign: 'center',
            }}
        >
            <Card onClick={click}>
                <Card.Body>
                    <div>{message}</div>
                </Card.Body>
            </Card>
        </div>
    )
}
