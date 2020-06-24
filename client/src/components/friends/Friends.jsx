import React from 'react'
import {FriendProfile} from './FriendProfile'
import {FriendProfileInfo} from "./FriendProfileInfo"

export const Friends = () => {
    const   [display, setDisplay] = React.useState('none')
    const   [comp, setComp] = React.useState()
    const   [data, setData] = React.useState({})
    
    const handleDisplay = () =>{
        setDisplay('flex');
    }
    const handleExit = () =>{
        setDisplay('none');
    }

    const onload = async () =>{
        await fetch('/user/getFriends', {
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
        .then (data =>{
            // console.log(data.userinfo)
            let i= 0;
            let holdInfo = data.userinfo.map(data => {
                // console.log(data)
                return <FriendProfile handleDisplay={handleDisplay}  data={data} setData={setData} key={i++}/>
            })
            setComp(holdInfo)
        })
    }
    if (comp === undefined)
        onload()
    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
                overflow: 'auto',
                height: '80vh'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '100%',
                    overflow: 'auto',
                    height: '80vh'
                }}
            >
                {comp}
            </div>
            <div
                style={{
                    display: display
                }}
            >
                <FriendProfileInfo handleExit={handleExit} data={data}/>                
            </div>
        </div>
    )
}
