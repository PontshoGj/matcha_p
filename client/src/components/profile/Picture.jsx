import React, {useContext} from 'react'
import {GlobalContext} from '../../context/GlobalState'
import {Card, Button, Form} from 'react-bootstrap'

export const Picture = ({image, num, onload}) => {

    const   {setLog} = useContext(GlobalContext)
    // const   [browse, setBrowse] = React.useState("")

   const update = async (e) => {
        const file = new FormData()
        file.append('pic', e.target.files[0])
        console.log("aaa")
        await fetch('/updateImage', {
            method: 'POST',
            redirect: 'manual',
            headers: {
            //   'Content-Type': 'application/json;charset=utf-8',
              'authorization': `bearer ${localStorage.getItem('authorization')}`,
              'num': num 
            },
            body: file
        })
        .then (data => {
            if(data.status === 403) throw data
            return data.json()
        })
        .then (data => {
            // console.log(data)
            if (data.result === true)
                onload()
            // setImages( <img src={data.img[0]} />)
            // console.log(im)
        })
        .catch(err =>{
            if (err.status === 403)
                setLog(false)
        })
    }

    // onload()
    return (
        <div
            style={{
                // margin: '5rem'
                marginRight: '1vw'
            }}
        >
            <Card style={{ width: '17rem', height: '17rem' }}>
                <Card.Body>
                    <img src={image} alt=""  width='180' height='180'/>
                    <div
                        style={{
                            marginTop: '2vh'
                        }}
                    >
                        {/* <Button variant="dark" type='submit' style={{marginRight: '1vw'}} >Delete</Button> */}
                            <Form encType="multipart/form-data">
                            <Button variant="dark" style={{height: '4.5vh'}}>Update
                                <Form.File 
                                    id={num}
                                    name="pic"
                                    // onChange={change}
                                    custom
                                >
                                    <Form.File.Input onChange={update} />
                                    {/* <Form.File.Label data-browse="browse" > */}
                                        {/* {(browse === "") ? "image" : Ok}  */}
                                    {/* </Form.File.Label> */}
                                    {/* <Form.Control.Feedback type="valid">
                                    </Form.Control.Feedback> */}
                                </Form.File>
                            </Button>
                            </Form>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
