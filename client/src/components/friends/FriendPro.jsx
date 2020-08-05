import React, { useContext } from 'react'
import {GlobalContext} from '../../context/GlobalState'

import {Card} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faThumbsDown, faThumbsUp,faEllipsisH} from '@fortawesome/free-solid-svg-icons'

export const FriendPro = ({handleDisplay, setData, data, onload, freq, socket, setImage}) => {
    const   {setLog} = useContext(GlobalContext)

    const    [images, setImages] = React.useState("")

    const handleOnClick = () =>{
        handleDisplay()
        setData(data);
        userpic()
    }
    const onloads = async () =>{
        await fetch('/getProfImage', {
            method: 'POST',
            redirect: 'manual',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'authorization': `bearer ${localStorage.getItem('authorization')}` 
            },
            body: JSON.stringify({user_id: data.id})
        })
        .then (data => {
            if(data.status !== 200) throw data
            return data.json()
        })
        .then (data => {
            // console.log(data)
            if (data.result === 1){
                setImages(data.img)
            }
        })
        .catch(err =>{
            if (err.status === 403)
                setLog(false)
        })
    }
    if (images === ""){
        onloads()
    }
    const dislike = async () =>{
        await fetch('/user/dislike',{
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
                socket.emit("notif", {id: localStorage.getItem('id'), message: `${data.firstname} disliked you`})
            }
        })
        .catch (err =>{
            console.log(err)
        })

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
                socket.emit("notif", {id: localStorage.getItem('id'), message: `${data.firstname} liked you`})
            }
        })
        .catch (err =>{
            console.log(err)
        })
    }

    const userpic = async () =>{
        await fetch('/getImageU', {
            method: 'POST',
            redirect: 'manual',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'authorization': `bearer ${localStorage.getItem('authorization')}` 
            },
            body: JSON.stringify({user_id: data.id})
        })
        .then (data => {
            if(data.status !== 200) throw data
            return data.json()
        })
        .then (data => {
            // console.log(data)
            if (data.result === 1){
                setImage(data.img)
                // setNum(data.image_id)
            }
        })
        .catch(err =>{
            if (err.status === 403)
                setLog(false)
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
                    <Card.Img variant="top" src={images} width='180' height='180' />
                    <Card.Body>
                        <Card.Title>{data.firstname} {data.lastname}</Card.Title>
                        <div style={{marginTop: '1vh'}}>
                            <FontAwesomeIcon icon={faExclamationTriangle} onClick={dislike} size={'1x'} />
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
