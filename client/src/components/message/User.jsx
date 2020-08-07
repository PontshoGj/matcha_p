import React, {useEffect}  from 'react'
import {Card} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import {Messages} from './Messages'
import {Mes} from './Mes'
export const User = ({data, setMessage, setUser, setDisplay, socket}) => {
    const   [dis, setDis] = React.useState(0)
    const   [response, setResponse] = React.useState(<Mes message={"No messages"} key={1}/>, {})
    const   [displays, setDisplays] = React.useState('none')
    const setdata = () =>{
        // console.log(data)
        setMessage(data)
        setUser({firstname: data.firstname, lastname: data.lastname})
        setDisplay('column')
    }
    // setdata()
    let replay = []
    useEffect(()=>{
        socket.on("message", dat =>{
            console.log(dat)
            if (parseInt(dat.friend_id) === parseInt(data.id)){
                replay.push({message: dat.message})
                let rp = replay.map(mess =>{
                    let i = 0
                    return <Mes message={mess.message} key={i++}/>
                } )
                setResponse(rp)
            }
                // console.log(response)
        })
    })
    const onclick = () =>{
        if (!dis){
            setDis(1)
            setDisplays('flex')
        }else{
            setDisplays('none') 
            setDis(0)
        }
    }
    return (
        <div
            style={{
                marginTop: '1vh',
            }}
            onClick={setdata}
        >
            <div
            >
                <Card style={{ width: '98vw', marginLeft: '1vw' }} onClick={onclick}>
                    <Card.Body>
                        {/* <Card.Title> */}
                        <div
                            style={{
                                display: 'flex'
                            }}
                        >
                            <div
                                style={{
                                    width: '90%'
                                }}
                            >
                                {data.firstname} {data.lastname}
                            </div>
                            <div
                                style={{
                                    width: '10%'
                                }}
                            >
                                <FontAwesomeIcon icon={faComment} size='1x' />
                            </div>
                        </div>
                        {/* </Card.Title> */}
                    </Card.Body>
                </Card>
            </div>
            <div
                style={{
                    display: displays
                }}
            >
                <Messages socket={socket} id={data.id} message={response}/>
            </div>
        </div>
    )
}
