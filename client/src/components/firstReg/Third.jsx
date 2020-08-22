import React from 'react'
import {Button, Form    } from 'react-bootstrap'
// import {useForm} from 'react-hook-form'
// import {GlobalContext} from '../../context/GlobalState'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Second } from './Second'
import {Fourth} from './Fourth'
import ipLocation  from "iplocation";


export const Third = ({setDisplay}) => {
    // const   {register, handleSubmit} = useForm()

    const   [lat, setLat] = React.useState(1)
    const   [lng, setLng] = React.useState(1)
    // const   [la, setLats] = React.useState()
    // const   [ln, setLngs] = React.useState()

    const onload = async () =>{
        getLocation()

        await fetch("https://www.cloudflare.com/cdn-cgi/trace")
        .then(response => {
            return response.text();
        })
        .then(async (res) => {
            let ip = res.split("\n")[2]
            let ip2 = ip.split('=')
            let d = await ipLocation(ip2[1])
            setLat(Number.parseFloat(d.latitude).toFixed(5))
            setLng(Number.parseFloat(d.longitude).toFixed(5))
            // setLat(Number.parseFloat(d.latitude).toFixed(5))
            // setLng(Number.parseFloat(d.longitude).toFixed(5))
        })
        .catch(err => console.log(err))
    }
    // if (lat === undefined)
        onload()

    function getLocation () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    function getPosition(position){
        console.log("it's in here")
        setLat(Number.parseFloat(position.coords.latitude).toFixed(5))
        setLng(Number.parseFloat(position.coords.longitude).toFixed(5))
    }
    // const onload = async () => {
        
    //     getLocation()
    //     console.log(lat)
    //     console.log(lng)
    // }

    // onload()
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
    const onSubmit = async () => {
        setDisplay(<Fourth setDisplay={setDisplay} />)
        let data = {
            lat: lat,
            lng: lng
        }
        await fetch('/user/saveLocation', {
            method: 'POST',
            redirect: 'manual',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'authorization': `bearer ${localStorage.getItem('authorization')}` 
            },
            body: JSON.stringify(data)
        })
        .then (data => {
            if(data.status !== 200) throw data
            return data.json()
        })
        .then (value =>{
            // console.log(value)
        setDisplay(<Fourth setDisplay={setDisplay} />)

        })
        .catch (err => {
            // if (err.status === 403)
                // setLog(false)
        })
    }

      const back = () =>{
          setDisplay(<Second setDisplay={setDisplay}/>)
      }
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <Form onSubmit={onSubmit}>
                <LoadScript
                    googleMapsApiKey="AIzaSyCeJqpYrUeIRPx5Q5zAmbjBPJc_mbIBKOw"
                >
                    <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={18}
                    >
                        <Marker
                            // onLoad={onLoad}
                            position={position}
                            draggable={true}
                            // ref={register}
                        />
                    </GoogleMap>
                </LoadScript>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Button variant="dark"  type='submit'   style={{width: '17vw', marginTop: '3vh'}} onClick={back} block>Back</Button>
                    <Button variant="dark"  type='submit'   style={{width: '17vw', marginLeft: '2vw' ,marginTop: '3vh'}} block>Next</Button>
                </div>
            </Form>
        </div>
    )
}
