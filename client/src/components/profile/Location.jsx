import React, { useContext } from 'react'
import {GlobalContext} from '../../context/GlobalState'
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import {Loc} from './Loc'

export const Location = () => {
    const   {setLog} = useContext(GlobalContext)
    const   [display, setDisplay] = React.useState() 

    const onload = async () => {
        await fetch('/user/getLocation', {
            method: 'POST',
            redirect: 'manual',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'authorization': `bearer ${localStorage.getItem('authorization')}` 
            },
        })
        .then (data => {
            if(data.status !== 200) throw data
            return data.json()
        })
        .then (data => {
            // console.log(data)
            if (data.result === 1){
                setDisplay(<Loc lat={data.lat} lng={data.lng} />)
            }
            // setEmail(data.email)
        })
        .catch(err =>{
            if (err.status === 403)
                setLog(false)
        })

    }

    if (display === undefined)
        onload()
    return (
        <div style={{
            display: 'column',
            // flexDirection: 'column',
            width: '60vw',
            marginTop: '3vh',
            marginLeft: '3vw',
            // paddingLeft: '2vw'
            height: '45vh'
        }}>
            {display}
        </div>
    )
}