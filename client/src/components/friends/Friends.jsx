import React from 'react'
import {FriendProfile} from './FriendProfile'
import {FriendProfileInfo} from "./FriendProfileInfo"

export const Friends = () => {
    const   [display, setDisplay] = React.useState('none')
    const   [data, setData] = React.useState({name: 'Pontsho Mogwere'})
    const handleDisplay = () =>{
        setDisplay('flex');
    }
    const handleExit = () =>{
        setDisplay('none');
        console.log("its working")
    }
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
                <FriendProfile handleDisplay={handleDisplay} data={data} setData={setData}/>
                <FriendProfile handleDisplay={handleDisplay} data={data} setData={setData}/>
                <FriendProfile handleDisplay={handleDisplay} data={data} setData={setData}/>
                <FriendProfile handleDisplay={handleDisplay} data={data} setData={setData}/>
                <FriendProfile handleDisplay={handleDisplay} data={data} setData={setData}/>
                <FriendProfile handleDisplay={handleDisplay} data={data} setData={setData}/>
                <FriendProfile handleDisplay={handleDisplay} data={data} setData={setData}/>
                <FriendProfile handleDisplay={handleDisplay} data={data} setData={setData}/>
                <FriendProfile handleDisplay={handleDisplay} data={data} setData={setData}/>
                <FriendProfile handleDisplay={handleDisplay} data={data} setData={setData}/>
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
