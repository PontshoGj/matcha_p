import React, {useContext} from 'react'
import {GlobalContext} from '../../context/GlobalState'
import {Dis} from './Dis'

export const Notif = () => {
    const   {setLog} = useContext(GlobalContext)

    const   [display, setDisplay] = React.useState()

    const onload = async () => {
        await fetch('/user/getnotif', {
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
        .then (data => {
            // console.log(data);
            if (data.result === -1)
                setLog(false)
            if (data.result === 0)
                setDisplay("no notification")
            if (data.result === 1){
                let i = 0
                let pi = data.info.map(ni =>{
                    // console.log(ni.value)
                    return <Dis message={ni.value} key={i++}/>
                })
                setDisplay(pi)
            }
        })
        .catch(err => {
            if (err === 403)
                setLog(false)
        })
    }
    if (display === undefined){
        onload()
    }
    return (
        <div>
            {display}
        </div>
    )
}