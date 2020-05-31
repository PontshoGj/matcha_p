import React, {useContext} from 'react'
import {Button, Form, Col, Row} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {GlobalContext} from '../../context/GlobalState'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { First } from './First'
import { Second } from './Second'
import { Third } from './Third'

export const EditionalInfo = () => {
    const   [display, setDisplay] = React.useState(null)

    return (
        <div 
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <>
                {(display)? display : <First setDisplay={setDisplay}/>}
            </>
        </div>
    )
}
