import React from 'react'
import {Suggest} from './Suggest'
import {MoreInfo} from './MoreInfo'
import {AdvancedMatch} from './AdvancedMatch'
import {Button} from 'react-bootstrap'

export const Match = () => {
    const   [display, setDisplay] = React.useState([])
    const   [displays, setDisplays] = React.useState('none')
    const   [info, setInfo] = React.useState({})
    const   [search, setSearch] = React.useState('none')

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
    const advancedSearch = () =>{
        setSearch('flex')
    }
    return (
        <div
            style={{
                display: 'colum',
                flexWrap: 'wrap',
                width: '100%',
                overflow: 'auto',
                height: '80vh'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Button variant="dark" type='submit' size='lg'  style={{width: '25vw', marginTop: '3vh'}} onClick={advancedSearch} block>Advanced Search</Button>
            </div>
            <div
                style={{
                    display: search,
                    justifyContent: 'center'
                }}
            >
                <AdvancedMatch />
            </div>
            <hr />
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '100%',
                    overflow: 'auto',
                    height: '70vh'
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
        </div>
    )
}
