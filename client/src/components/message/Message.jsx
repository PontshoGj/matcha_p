import React, {useContext} from 'react'
import { User } from './User'
import {GlobalContext} from '../../context/GlobalState'

export const Message = ({socket}) => {
    const {setLog} = useContext(GlobalContext)
    const   [comp, setComp] = React.useState()
    // const   [displays, setDisplay] = React.useState('none')
    // const   [user, setUser] = React.useState('')
    // useEffect(() => {

    //     socket.emit("userconnect",{authorization:localStorage.getItem('authorization'), userid: localStorage.getItem('id')})
    // })

    const onload = async () =>{
        try {
            await fetch('/user/getFriends', {
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
            .then (data =>{
                // console.log(data.userinfo)
                if (data.result === -1)
                    setLog(false)
                if (data.result){
                    let holdInfo = data.userinfo.map(data => {
                        // console.log(data)
                        // let i = 0
                        return <User data={data} key={data.id} socket={socket}/>
                    })
                    // console.log(holdInfo)
                    setComp(holdInfo)
                }

            })
            .catch(err=>{
                if (err === 403)
                    setLog(false)
            })
        }catch (error){
            
        }
       
    }
    if (comp === undefined){
        onload()
    }
    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
                height: '80vh'
            }}
        >
            <div
                style={{
                    display: 'column',
                    flexWrap: 'wrap',
                    width: "100%",
                    borderRight: '0.1vh solid',
                    height: '80vh',
                    overflow: 'auto',
                }}
            >
                {comp}
            </div>
        </div>
    )
}