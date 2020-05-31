import React, {useContext} from 'react'
import {Form, Col, Row, Button} from 'react-bootstrap'
import {GlobalContext} from '../../context/GlobalState'
import {Third} from './Third'
import {useForm} from 'react-hook-form'
import {UploadImage} from '../upload/UploadImage'

export const Fourth = ({setDisplay}) => {
    const   {setLog} = useContext(GlobalContext)
    const   [count, SetCount] = React.useState(0)
    const   [disabled, setDisabled] = React.useState(true)
    
    const counter = () =>{
        SetCount(count + 1)
        let val = count
        if (count >= 4){
            setDisabled(false)
        }
    }
    const onSubmit = async () => {
        console.log(count)
        if (count => 4){
            await fetch('', {
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
            .then (value =>{
                console.log(value)
            })
            .catch (err => {
                if (err.status === 403)
                    setLog(false)
            })
        }
    }

    const back = () =>{
        setDisplay(<Third setDisplay={setDisplay}/>)
    }
    return (
        <div 
            style={{
                justifyContent: 'center',
            }}
        >
            <UploadImage id={"1"} counter={counter}/>
            <UploadImage id={"2"} counter={counter}/>
            <UploadImage id={"3"} counter={counter}/>
            <UploadImage id={"4"} counter={counter}/>
            <UploadImage id={"5"} counter={counter}/>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Button variant="dark"  type='submit'   style={{width: '17vw', marginTop: '3vh'}} onClick={back} block>Back</Button>
                    <Button variant="dark" disabled={disabled} type='submit'  onClick={onSubmit} style={{width: '17vw', marginLeft: '2vw' ,marginTop: '3vh'}} block>Next</Button>
                </div>
        </div>
    )
}
