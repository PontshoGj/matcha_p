import React from 'react'
import {FriendProfile} from './FriendProfile'
import {FriendProfileInfo} from "./FriendProfileInfo"
import {Tabs, Tab} from 'react-bootstrap'
import {FriendPro} from './FriendPro'

export const Friends = ({socket, changeMessage}) => {
    const   [display, setDisplay] = React.useState('none')
    const   [comp, setComp] = React.useState()
    const   [comps, setComps] = React.useState()
    const   [data, setData] = React.useState({})
    const   [dum, setDum] = React.useState()    
    const   [dums, setDums] = React.useState()    
    const   [image, setImage] = React.useState("")
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
            if(data.status !== 200) throw data
            return data.json()
        })
        .then (data =>{
            // console.log(data)
            if (data.result === 1){
                let i= 0;
                let holdInfo = data.userinfo.map(data => {
                    // console.log(data)
                    return <FriendProfile setImage={setImage} handleDisplay={handleDisplay} socket={socket} onload1={onload} freq={freq} changeMessage={changeMessage} data={data} setData={setData} key={i++}/>
                })
                setComp(holdInfo)
                setDums()
            }else{
                setDums('')
            }
        })
        .catch(err=>{

        })
    }
    const freq = async () => {
        await fetch('/user/getfreq', {
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
            // console.log(data)
            if (data.result === 1){
                let i= 0;
                let holdInfo = data.userinfo.map(data => {
                    // console.log(data)
                    return <FriendPro setImage={setImage} handleDisplay={handleDisplay} socket={socket} data={data} setData={setData} key={i++} onload={onload} freq={freq}/>
                })
                setComps(holdInfo)
            }else{
                setDum("")
                // console.log(comps)
            }
        })
        .catch(err=>{

        })
    }
    if (comp === undefined)
        onload()
    if (comps === undefined)
        freq()

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
            <Tabs defaultActiveKey="friend" id="uncontrolled-tab-example">
                <Tab eventKey="friend" title="firend">
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            width: '100%',
                            overflow: 'auto',
                            height: '80vh'
                        }}
                    >
                        {(dums !== undefined)?dums:comp}
                        
                    </div>
                    <div
                        style={{
                            display: display
                        }}
                    >
                        <FriendProfileInfo image={image} handleExit={handleExit} data={data}/>                
                    </div>
                </Tab>
                <Tab eventKey="friendRequest" title="friendRequest">
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            width: '100%',
                            overflow: 'auto',
                            height: '80vh'
                        }}
                    >
                        {(dum !== undefined)?dum:comps}
                    </div>
                    <div
                        style={{
                            display: display
                        }}
                    >
                        <FriendProfileInfo image={image} handleExit={handleExit} data={data}/>                
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}
