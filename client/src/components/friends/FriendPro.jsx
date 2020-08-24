import React, { useContext, useEffect } from 'react'
import {GlobalContext} from '../../context/GlobalState'

import {Card} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faThumbsDown, faThumbsUp,faEllipsisH} from '@fortawesome/free-solid-svg-icons'

export const FriendPro = ({handleDisplay, setData, data, onload, freq, socket, setImage}) => {
    const   {setLog} = useContext(GlobalContext)
    const   [online, setOnline] = React.useState(data.date)
    const    [images, setImages] = React.useState("")

    useEffect(() => {
        socket.on('status', data =>{
            console.log(data)
            if (parseInt(data.result) === parseInt(data.id)){
                setOnline('online')
            }
        })
        socket.emit('check', {id: data.id})
        socket.on("onli", dat =>{
            // console.log(dat)
            // console.log(data.id)
            // console.log(parseInt(dat.userid) === parseInt(data.id))
            if (parseInt(dat.userid) === parseInt(data.id)  && dat.online === 1){
                setOnline('online')
            }
            if (parseInt(dat.userid) === parseInt(data.id)  && dat.online === 0){

                setOnline(data.date)
            }
        })
    })
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
            if (data.result === -1)
                setLog(false)
            if (data.result === 1){
                setImages(data.img)
            }
        })
        .catch(err =>{
            if (err === 403)
                setLog(false)
        })
    }
    if (images === ""){
        onloads()
    }
    const dislike = async () =>{
        await fetch('/user/dislike2',{
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
        .then (dat => {
            // console.log(data)
            if (dat.result === -1)
                setLog(false)
            if (dat.result){
                freq()
                onload()
                socket.emit("notif", {id: localStorage.getItem('id'), userid: data.id, message: `${localStorage.getItem('firstname')} ${localStorage.getItem('lastname')} disliked you`})

            }
        })
        .catch (err =>{
            // console.log(err)
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
        .then (dat => {
            // console.log(data)
            if (dat.result){
                freq()
                onload()
                socket.emit("notif", {id: localStorage.getItem('id'), userid: data.id, message: `${localStorage.getItem('firstname')} ${localStorage.getItem('lastname')} liked you. you are now friends`})
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
        .then (dat => {
            // console.log(data)
            if (dat.result === -1)
                setLog(false)
            if (dat.result === 1){
                setImage(dat.img)
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
                            {/* <FontAwesomeIcon icon={faExclamationTriangle} onClick={dislike} size={'1x'} /> */}
                            <FontAwesomeIcon icon={faThumbsDown} onClick={dislike} style={{marginLeft: '2vw'}} size='1x' />
                            <FontAwesomeIcon icon={faThumbsUp} onClick={like} style={{marginLeft: '2vw'}} size='1x' />
                        </div>
                        <div style={{marginTop: '1vh'}}>
                            <FontAwesomeIcon icon={faEllipsisH}  onClick={handleOnClick} size='2x' />
                            <FontAwesomeIcon icon={faEllipsisH}  onClick={handleOnClick} size='2x' />
                        </div>
                        {/* <Button variant="primary" onClick={handleOnClick}> Show More</Button> */}
                        <div>{online}</div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
