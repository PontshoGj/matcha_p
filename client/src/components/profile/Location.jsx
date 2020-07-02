import React, { useContext } from 'react'
import {Form} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {GlobalContext} from '../../context/GlobalState'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export const Location = () => {
    const   {setLog} = useContext(GlobalContext)
    const   {handleSubmit} = useForm()
    const   [lat, setLat] = React.useState()
    const   [lng, setLng] = React.useState()

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
            if(data.status === 403) throw data
            return data.json()
        })
        .then (data => {
            console.log(data)
            // setEmail(data.email)
        })
        .catch(err =>{
            if (err.status === 403)
                setLog(false)
        })
        const getLocation = () =>{
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(getPosition);
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        }
    
        function getPosition(position){
            setLat(Number.parseFloat(position.coords.latitude).toFixed(5))
            setLng(Number.parseFloat(position.coords.longitude).toFixed(5))
        }
        
        getLocation()
    }

    onload()
    const containerStyle = {
        width: '48vw',
        height: '60vh'
      };



    const position = {
        lat: +lat, 
        lng: +lng
    };

    const center = {
        lng: +lng,
        lat: +lat 
    };
    //   const onLoad = marker => {
    // //     let markers = marker
    //     console.log(marker)
    //   }
    const onSubmit = async (data) => {
        data.username = 'Pontsho'
        console.log(data)
        await fetch('/user/updateemail', {
            method: 'POST',
            redirect: 'manual',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'authorization': `bearer ${localStorage.getItem('authorization')}` 
            },
            body: JSON.stringify(data)
        })
        .then (data => {
            if(data.status === 403) throw data
            return data.json()
        })
        .then (value =>{
            // console.log(value)
        })
        .catch(err =>{
            if (err.status === 403)
                setLog(false)
        })
    }
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
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <LoadScript
                        googleMapsApiKey="AIzaSyCeJqpYrUeIRPx5Q5zAmbjBPJc_mbIBKOw"
                    >
                        <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={18}
                        >
                            <Marker
                                position={position}
                                draggable={true}
                            />
                        </GoogleMap>
                    </LoadScript>
                </Form>
        </div>
    )
}