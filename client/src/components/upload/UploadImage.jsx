import React, {useContext} from 'react'
// import {useForm, ErrorMessage} from 'react-hook-form'
import {Form} from 'react-bootstrap'
import {GlobalContext} from '../../context/GlobalState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

export const UploadImage = ({counter, id}) => {
    const   {setLog} = useContext(GlobalContext)
    const   [browse, setBrowse] = React.useState("")
    const   [Ok, setOk] = React.useState(<FontAwesomeIcon icon={faCheck} size='1x' />)
    const   [valid, setVaid] = React.useState(false)
    const   [message, setMessage] = React.useState('')
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
            if(data.status !== 200) throw data
            return data.json()
        })
        .then (value =>{
            if (value.result === -1)
                setLog(false)
            if (value.result){
                // console.log(value)
                counter();
                setBrowse("browse")
                setVaid(false)
                setOk(<FontAwesomeIcon icon={faCheck} size='1x' />)
            }else{
                console.log(value)
                setBrowse('browse')
                setOk(<FontAwesomeIcon icon={faTimes} size='1x' />)
                setVaid(true)
                setMessage(value.message)
            }
        })
        .catch (err => {
            // console.log(err)
            if (err.status === 403)
                setLog(true)
        })
    }
    return (
        <div 
            style={{
                justifyContent: 'center',
                marginTop: '1vh'
            }}
        >
            {/* <FontAwesomeIcon icon={faCheckCircle} size='2x' /> */}
            <Form encType="multipart/form-data">
                <Form.File 
                    id={id}
                    name="pic"
                    // onChange={change}
                    custom
                >
                    <Form.File.Input onChange={change} isValid={valid} />
                    <Form.File.Label data-browse="browse" >
                        {(browse === "") ? "image" : Ok} 
                    </Form.File.Label>
                    <Form.Control.Feedback type="valid">
                        { message }
                    </Form.Control.Feedback>
                </Form.File>
            </Form>
        </div>
    )
}