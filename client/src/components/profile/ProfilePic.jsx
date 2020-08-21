import React, { useContext } from 'react'
import {GlobalContext} from '../../context/GlobalState'
import { Picture } from './Picture'
import {useForm} from 'react-hook-form'
import { Button, Form, Row} from 'react-bootstrap'

export const ProfilePic = () => {
    const   {setLog} = useContext(GlobalContext)
    const    [image, setImages] = React.useState("")
    const    [num, setNum] = React.useState("")
    const    [pro, setProf] = React.useState("Update Profile Picture")
    const   {register, handleSubmit} = useForm()

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
            if(data.status !== 200) throw data
            return data.json()
        })
        .then (data => {
            if (data.result === 1){
                // console.log(data.image_id)
                setImages(data.img)
                setNum(data.image_id)
            }
        })
        .catch(err =>{
            if (err.status === 403)
                setLog(false)
        })
    }

    if (image === "")
        onload()
    const submit = async (data) =>{
        // console.log(data)
        // console.log(num[parseInt(data.pic)])
        await fetch('/updateProfImage', {
            method: 'POST',
            redirect: 'manual',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'authorization': `bearer ${localStorage.getItem('authorization')}`,
            },
            body: JSON.stringify({num: num[parseInt(data.pic)], pro: num[0]})
        })
        .then (data => {
            if(data.status === 403) throw data
            return data.json()
        })
        .then (data => {
            // console.log(data)
            if (data.result === true){
                setProf("Profile Picture Updated")
            }
                // onload()
            // setImages( <img src={data.img[0]} />)
            // console.log(im)
        })
        .catch(err =>{
            // if (err.status === 403)
          
        })
    }

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
            <Form onSubmit={handleSubmit(submit)}>
                <fieldset>
                    <Form.Group as={Row} controlId='formHorizontalInterests' encType="multipart/form-data">
                        <Picture image={image[0]} num={num[0]} onload={onload}/><input type="radio" ref={register} name="pic" value='0' id="0"/>
                        <Picture image={image[1]} num={num[1]} onload={onload}/><input type="radio" ref={register} name="pic" value='1' id="1"/>
                        <Picture image={image[2]} num={num[2]} onload={onload}/><input type="radio" ref={register} name="pic" value='2' id="2"/>
                        <Picture image={image[3]} num={num[3]} onload={onload}/><input type="radio" ref={register} name="pic" value='3' id="3"/>
                        <Picture image={image[4]} num={num[4]} onload={onload}/><input type="radio" ref={register} name="pic" value='4' id="4"/>
                    </Form.Group>
                </fieldset>
                <Button variant="dark" type='submit' size='lg'  style={{width: '25vw', marginLeft: '19vw', marginTop: '3vh'}} block>{pro}</Button>
            </Form>
        </div>
    )
}
