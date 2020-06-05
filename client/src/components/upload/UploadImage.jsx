import React, {useContext} from 'react'
// import {useForm, ErrorMessage} from 'react-hook-form'
import {Form} from 'react-bootstrap'
import {GlobalContext} from '../../context/GlobalState'

export const UploadImage = ({counter, id}) => {
    const   {setLog} = useContext(GlobalContext)

    const change = async (e) => {
        console.log("uploading")
        const file = new FormData()
        file.append('pic', e.target.files[0])
        await fetch('/uploadImage', {
            method: 'POST',
            headers: {
                'authorization': `bearer ${localStorage.getItem('authorization')}` 
            },
            body: file
        })
        .then (data => {
            if(data.status === 403) throw data
            return data.json()
        })
        .then (value =>{
            if (value.result){
                console.log(value)
                counter();
            }
        })
        .catch (err => {
            console.log(err)
            if (err.status === 403)
                setLog(false)
        })
    }
    return (
        <div 
            style={{
                justifyContent: 'center',
                marginTop: '1vh'
            }}
        >
            <Form encType="multipart/form-data">
                <Form.File 
                    id={id}
                    label="Image"
                    name="pic"
                    onChange={change}
                    // value=""
                    custom
                />
            </Form>
        </div>
    )
}