import React, { useContext, useEffect } from 'react'
import {GlobalContext} from '../../context/GlobalState'
import {Card} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faEllipsisH, faEnvelope } from '@fortawesome/free-solid-svg-icons'

export const FriendProfile = ({handleDisplay, setData,data, setImage, onload1, freq, socket,changeMessage}) => {
    const   {setLog} = useContext(GlobalContext)
    const    [images, setImages] = React.useState("")
    const   [online, setOnline] = React.useState(data.date)
    useEffect(() => {

        socket.on("notif", dat =>{
            // console.log(dat)
            if (dat.id === parseInt(localStorage.getItem('id'))){
                if (parseInt(dat.code) === parseInt(1))
                    onload1()
            }
        })
        socket.emit('check', {id: data.id})
        socket.on("onli", dat =>{
            // console.log(dat.userid)
            // console.log(data.id)
            // console.log(parseInt(dat.userid) === parseInt(data.id))
            if (parseInt(dat.userid) === parseInt(data.id)){
                // console.log(dat)

                setOnline('online')
            }
        })
    })

    const onload = async () =>{
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
            if (data.result === 1){
                setImages(data.img)
            }
            userpic()
        })
        .catch(err =>{
            if (err.status === 403)
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
    const dislike = async () =>{
        await fetch('/user/del',{
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
                onload1()
                socket.emit("notif", {id: localStorage.getItem('id'), userid: data.id, message: `someone friend disliked you`, code: 1})
            }
        })
        .catch (err =>{
            console.log(err)
        })

    }
    const handleOnClick = () =>{
        setData(data);
        handleDisplay()
        userpic()
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
                    <Card.Img variant="top" src={images} width='180' height='180'></Card.Img>
                    <Card.Body>
                        <Card.Title>{data.firstname} {data.lastname}</Card.Title>
                        <div style={{marginTop: '1vh'}}>
                            <FontAwesomeIcon icon={faExclamationTriangle} onClick={dislike} size={'1x'} />
                            <FontAwesomeIcon icon={faEnvelope} size={'1x'} onClick={changeMessage} style={{marginLeft: '2vw'}}/>
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
