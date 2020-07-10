import React from 'react'
// import {GlobalContext} from '../../context/GlobalState'
import {Card, Button} from 'react-bootstrap'

export const Picture = ({image}) => {

    // const   {setLog} = useContext(GlobalContext)

//    const onload = async () => {
//         await fetch('/getImage', {
//             method: 'POST',
//             redirect: 'manual',
//             headers: {
//               'Content-Type': 'application/json;charset=utf-8',
//               'authorization': `bearer ${localStorage.getItem('authorization')}` 
//             },
//         })
//         .then (data => {
//             if(data.status === 403) throw data
//             return data.json()
//         })
//         .then (data => {
//             // console.log(data.img[0])
//             // setImages( <img src={data.img[0]} />)
//             // console.log(im)
//         })
//         .catch(err =>{
//             if (err.status === 403)
//                 setLog(false)
//         })
//     }

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
                        <Button variant="dark" type='submit' style={{marginRight: '1vw'}} >Delete</Button>
                        <Button variant="dark" type='submit' >Upload</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
