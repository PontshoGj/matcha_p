import React from 'react'
import {Suggest} from './Suggest'
import {MoreInfo} from './MoreInfo'

export const Match = () => {
    const   [display, setDisplay] = React.useState([])
    const   [displays, setDisplays] = React.useState('none')
    const   [info, setInfo] = React.useState({})

    const handleExit = () =>{
        setDisplays('none');
    }

    const handleDisplay = () =>{
        setDisplays('flex');
    }

    const onload = async () =>{
        await fetch('/match/getMatch', {
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
            // console.log(data)
            let i= 0;
            let holdInfo = data.info.map(data => {
                return <Suggest handleDisplay={handleDisplay}  info={data} setInfo={setInfo} key={i++}/>
            })
            setDisplay(holdInfo)
        })
    }
    if (display[0] === undefined)
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
            {/* <div> */}
                {display}
            {/* </div> */}
            <div
                style={{
                    display: displays
                }}
            >
                <MoreInfo handleExit={handleExit} info={info}/>                
            </div>
        </div>
    )
}
