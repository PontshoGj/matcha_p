import React from 'react'
import {Card} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp, faEllipsisH } from '@fortawesome/free-solid-svg-icons'

export const Suggest = (props) => {
    const show = () =>{
        props.handleDisplay();
        props.setInfo(props.info);
    }
    const like = async() =>{
        // console.log(props)
        await fetch('/user/like',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
              'authorization': `bearer ${localStorage.getItem('authorization')}` 
            },
            body: JSON.stringify({id: props.info.user_id})
        })
        .then (data =>{
            if(data.status === 403) throw data
            return data.json()
        })
        .then (data => {
            console.log(data)
        })
        .catch (err =>{
            console.log(err)
        })
    }
    const dislike = async() =>{
        // console.log(props)
        await fetch('/user/dislike',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
              'authorization': `bearer ${localStorage.getItem('authorization')}` 
            },
            body: JSON.stringify({id: props.info.user_id})
        })
        .then (data =>{
            if(data.status === 403) throw data
            return data.json()
        })
        .then (data => {
            console.log(data)
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
                <Card style={{ width: '18rem' }} >
                    <Card.Img variant="top" src="" width='180' height='180' />
                    <Card.Body>
                        <Card.Title>{props.info.firstname} {props.info.lastname}</Card.Title>
                        <div>
                            <FontAwesomeIcon icon={faThumbsDown} onClick={dislike} size='2x' />
                            <FontAwesomeIcon icon={faThumbsUp} onClick={like} style={{marginLeft: '2vw'}} size='2x' />
                            {/* <Button>like</Button> */}
                            {/* <Button>unlke</Button> */}
                        </div>
                        <div style={{marginTop: '1vh'}}>
                            {/* <Button variant="primary" onClick={show}> Show More</Button> */}
                            <FontAwesomeIcon icon={faEllipsisH}  onClick={show} size='2x' />
                            <FontAwesomeIcon icon={faEllipsisH}  onClick={show} size='2x' />
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
