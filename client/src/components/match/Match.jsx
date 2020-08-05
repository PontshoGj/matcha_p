import React, { useContext } from 'react'
import {GlobalContext} from '../../context/GlobalState'
import {Suggest} from './Suggest'
import {MoreInfo} from './MoreInfo'
import {AdvancedMatch} from './AdvancedMatch'
import {Button} from 'react-bootstrap'

export const Match = ({socket}) => {
    const   {setLog} = useContext(GlobalContext)
    const   [display, setDisplay] = React.useState([])
    const   [displays, setDisplays] = React.useState('none')
    const   [info, setInfo] = React.useState({})
    const   [search, setSearch] = React.useState('none')
    const   [image, setImage] = React.useState("")
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
            if(data.status !== 200) throw data
            return data.json()
        })
        .then (data =>{
            // console.log(data)
            if (data.result === 1){
                let i= 0;
                let holdInfo = data.info.map(data => {
                    return <Suggest setImage={setImage} onload={onload} handleDisplay={handleDisplay} socket={socket} info={data} setInfo={setInfo} key={i++}/>
                })
                setDisplay(holdInfo)
            }else{
                setDisplay("")
            }
        })
        .catch(errr=>{
            
        })
    }
    if (display[0] === undefined)
        onload()
    const advancedSearch = () =>{
        setSearch('flex')
    }
    const advancedSearch2 = () =>{
        setSearch('none')
    }
    // const liked = (data) => {
    //     setDisplay(data)
    // }

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
                <AdvancedMatch onload={onload} advancedSearch2={advancedSearch2} setDisplay={setDisplay} handleDisplay={handleDisplay} setInfo={setInfo}/>
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
                    <MoreInfo handleExit={handleExit} image={image} info={info}/>                
                </div>
            </div>
        </div>
    )
}
