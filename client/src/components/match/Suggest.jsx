import React, { useContext, useEffect } from 'react'
import {GlobalContext} from '../../context/GlobalState'
import {Card} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp, faEllipsisH } from '@fortawesome/free-solid-svg-icons'

export const Suggest = (props) => {
    const   {setLog} = useContext(GlobalContext)
    const    [images, setImages] = React.useState("")
    const   [online, setOnline] = React.useState(props.info.date)
    useEffect(() => {
        props.socket.emit('check', {id: props.info.user_id})
        props.socket.on("onli", dat =>{
            // console.log(dat)
            // console.log(data.id)
            // console.log(parseInt(dat.userid) === parseInt(data.id))
            if (parseInt(dat.userid) === parseInt(props.info.user_id)  && dat.online === 1){
                // console.log(dat)

                setOnline('online')
            }
            if (parseInt(dat.userid) === parseInt(props.info.user_id)  && dat.online === 0){
                // console.log(dat)

                setOnline(props.info.date)
            }
        })
    })
    const show = () =>{
        props.handleDisplay();
        props.setInfo(props.info);
        userpic()
    }
    const onload = async () =>{
        await fetch('/getProfImage', {
            method: 'POST',
            redirect: 'manual',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'authorization': `bearer ${localStorage.getItem('authorization')}` 
            },
            body: JSON.stringify({user_id: props.info.user_id})
        })
        .then (data => {
            if(data.status !== 200) throw data
            return data.json()
        })
        .then (data => {
            // console.log(data)
            if (data.result === -1)
                setLog(false)
            if (data.result === 1){
                // console.log(data.image_id)
                setImages(data.img)
            }
        })
        .catch(err =>{
            if (err === 403)
                setLog(false)
        })
    }
    if (images === ""){
        onload()
    }
    const userpic = async () =>{
        await fetch('/getImageU', {
            method: 'POST',
            redirect: 'manual',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'authorization': `bearer ${localStorage.getItem('authorization')}` 
            },
            body: JSON.stringify({user_id: props.info.user_id})
        })
        .then (data => {
            if(data.status !== 200) throw data
            return data.json()
        })
        .then (data => {
            if (data.result === -1)
                setLog(false)
            if (data.result === 1){
                props.setImage(data.img)
                // setNum(data.image_id)
            }
        })
        .catch(err =>{
            if (err === 403)
                setLog(false)
        })
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
            if(data.status !== 200) throw data
            return data.json()
        })
        .then (data => {
            if (data.result === 1){
                // console.log("it runs")
                props.socket.emit("notif", {id: localStorage.getItem('id'), userid: props.info.user_id,message: `${localStorage.getItem('firstname')} ${localStorage.getItem('lastname')} liked you`})
                props.onload()
            }
            // console.log(data)
        })
        .catch (err =>{
            // console.log(err)
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
            if (data.result === 1){
                props.socket.emit("notif", {id: localStorage.getItem('id'), userid: props.info.user_id, message: `${localStorage.getItem('firstname')} ${localStorage.getItem('lastname')} disliked you`})
                props.onload()
            }
            console.log(data)
        })
        .catch (err =>{
            console.log(err)
        })

    }
    // console.log(props.info)
    return (
        <div
            style={{
                display: 'flex',
                padding: '3rem'
            }}
        >

            <div>
                <Card style={{ width: '18rem' }} >
                    <Card.Img variant="top" src={images} width='180' height='180' />
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
                        <div>{online}</div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
