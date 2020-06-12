import React, { useContext } from 'react'
import {GlobalContext} from '../../context/GlobalState'
import { Picture } from './Picture'

export const ProfilePic = () => {
    const   {setLog} = useContext(GlobalContext)
    const    [image, setImages] = React.useState("")

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
            if (data.result === 1){
                console.log(data)
                setImages(data.img)
            }
        })
        .catch(err =>{
            if (err.status === 403)
                setLog(false)
        })
    }

    if (image === "")
        onload()
    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                margin: '5rem',
                height: '100%',
                width: '55vw'
            }}
        >
            <Picture image={image[0]} />
            <Picture image={image[1]} />
            <Picture image={image[2]} />
            <Picture image={image[3]} />
            <Picture image={image[4]} />
        </div>
    )
}
