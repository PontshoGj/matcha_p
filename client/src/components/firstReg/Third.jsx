import React, {useContext} from 'react'
import {Button, Form, Col, Row} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {GlobalContext} from '../../context/GlobalState'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Second } from './Second'
import {Fourth} from './Fourth'
export const Third = ({setDisplay}) => {
    // const   {register, handleSubmit} = useForm()


    const onSubmit = async (e) => {
        e.PreventDefualt()
        console.log(e)
        // console.log(GoogleMap)
        // setDisplay(<Fourth setDisplay={setDisplay} />)
        // await fetch('', {
        //     method: 'POST',
        //     redirect: 'manual',
        //     headers: {
        //       'Content-Type': 'application/json;charset=utf-8',
        //       'authorization': `bearer ${localStorage.getItem('authorization')}` 
        //     },
        //     body: JSON.stringify(data)
        // })
        // .then (data => {
        //     if(data.status === 403) throw data
        //     return data.json()
        // })
        // .then (value =>{
        //     console.log(value)
        // })
        // .catch (err => {
        //     if (err.status === 403)
        //         setLog(false)
        // })
    }
    const change = () =>{
        // console.log(e)
    }
    const containerStyle = {
        width: '48vw',
        height: '60vh'
      };
      
      const center = {
        lat: -26.205051, 
        lng: 28.040141
      };
      const position = {
        lat: -26.205051, 
        lng: 28.040141
      };
      const onLoad = marker => {
    //     let markers = marker
        console.log(marker)
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
                            onLoad={onLoad}
                            position={position}
                            draggable={true}
                            onPositionChanged={change}
                            onFlatChanged={change}
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
