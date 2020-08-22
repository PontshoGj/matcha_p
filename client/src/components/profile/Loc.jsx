import React, { useContext } from 'react'
import {Form, Button} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {GlobalContext} from '../../context/GlobalState'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ipLocation  from "iplocation";

export const Loc = ({lat, lng}) => {
    const   {setLog} = useContext(GlobalContext)
    const   {handleSubmit} = useForm()
    const   [lats, setLat] = React.useState(lat)
    const   [lngs, setLng] = React.useState(lng)

    const   [la, setLats] = React.useState()
    const   [ln, setLngs] = React.useState()

    const onload = async () =>{
        await fetch("https://www.cloudflare.com/cdn-cgi/trace")
        .then(response => {
            return response.text();
        })
        .then(async (res) => {
            let ip = res.split("\n")[2]
            let ip2 = ip.split('=')
            let d = await ipLocation(ip2[1])
            setLats(Number.parseFloat(d.latitude).toFixed(5))
            setLngs(Number.parseFloat(d.longitude).toFixed(5))
            setLat(Number.parseFloat(d.latitude).toFixed(5))
            setLng(Number.parseFloat(d.longitude).toFixed(5))
        })
        .catch(err => console.log(err))
    }
    if (la === undefined)
        onload()

    const onSubmit = async (data) => {
        const getLocation = () =>{
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(getPosition);
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        }
    
        function getPosition(position){
            // console.log(position)
            setLat(Number.parseFloat(position.coords.latitude).toFixed(5))
            setLng(Number.parseFloat(position.coords.longitude).toFixed(5))
            // console.log(lats)
        }
        
        await getLocation()
        // data.username = 'Pontsho'
        // console.log(data)
        data.lat = la
        data.lng = ln
        // console.log(data)
        await fetch('/user/getUpdate', {
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

    const containerStyle = {
        width: '48vw',
        height: '60vh'
      };
    const position = {
        lat: +Number.parseFloat(lats).toFixed(5), 
        lng: +Number.parseFloat(lngs).toFixed(5)
    };

    const center = {
        lat: +Number.parseFloat(lats).toFixed(5), 
        lng: +Number.parseFloat(lngs).toFixed(5)
    };

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
                    <Button variant="dark" type='submit' size='lg'  style={{width: '25vw',  marginTop: '3vh'}} block>Update</Button>
                </Form>
        </div>
    )
}