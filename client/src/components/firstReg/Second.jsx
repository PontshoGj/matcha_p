import React, {useContext} from 'react'
import {Button, Form, Col} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {GlobalContext} from '../../context/GlobalState'
import {Third} from './Third'
import { First } from './First'

export const Second = ({setDisplay}) => {
    const   {setLog} = useContext(GlobalContext)
    const   {register, handleSubmit} = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        await fetch('/user/updatebio', {
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
            if (value.result)
                setDisplay(<Third setDisplay={setDisplay} />)

        })
        .catch (err => {
            if (err.status === 403)
                setLog(false)
        })
    }

    const back = () =>{
        setDisplay(<First setDisplay={setDisplay}/>)
    }
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Label column sm={2}>Bio!</Form.Label>
                    <Col sm={10}>
                        <Form.Control as="textarea" rows="10" name="bio"   ref={register}/>
                    </Col>
                    <div
                        style={{
                            display: 'flex'
                        }}
                    >
                        <Button variant="dark"  type='submit'  style={{width: '17vw', marginTop: '3vh'}} onClick={back} block>Back</Button>
                        <Button variant="dark"  type='submit'  style={{width: '17vw', marginLeft: '2vw', marginTop: '3vh'}} block>Next</Button>
                    </div>
            </Form>                
        </div>
    )
}
