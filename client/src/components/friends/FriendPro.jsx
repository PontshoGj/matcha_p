import React from 'react'
import {Card} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faThumbsDown, faThumbsUp,faEllipsisH} from '@fortawesome/free-solid-svg-icons'

export const FriendPro = ({handleDisplay, setData, data, onload, freq}) => {
    const handleOnClick = () =>{
        handleDisplay()
        setData(data);
    }
    const dislike = async () =>{

    }
    const like = async () =>{
        // console.log(data)
        await fetch('/user/addFriend',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
              'authorization': `bearer ${localStorage.getItem('authorization')}` 
            },
            body: JSON.stringify({id: data.id})
        })
        .then (data =>{
            if(data.status === 403) throw data
            return data.json()
        })
        .then (data => {
            // console.log(data)
            if (data.result){
                freq()
                onload()
                console.log('reload')
            }
        })
        .catch (err =>{
            console.log(err)
        })
    }
    return (
        <div
            style={{
                display: 'flex',
                padding: '3rem'
            }}
        >

            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="" width='180' height='180' />
                    <Card.Body>
                        <Card.Title>{data.firstname} {data.lastname}</Card.Title>
                        <div style={{marginTop: '1vh'}}>
                            <FontAwesomeIcon icon={faExclamationTriangle} size={'1x'} />
                            <FontAwesomeIcon icon={faThumbsDown} onClick={dislike} style={{marginLeft: '2vw'}} size='1x' />
                            <FontAwesomeIcon icon={faThumbsUp} onClick={like} style={{marginLeft: '2vw'}} size='1x' />
                        </div>
                        <div style={{marginTop: '1vh'}}>
                            <FontAwesomeIcon icon={faEllipsisH}  onClick={handleOnClick} size='2x' />
                            <FontAwesomeIcon icon={faEllipsisH}  onClick={handleOnClick} size='2x' />
                        </div>
                        {/* <Button variant="primary" onClick={handleOnClick}> Show More</Button> */}
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
