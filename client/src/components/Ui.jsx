import React, {useContext} from 'react'
import {Ui_Register_Login} from './Ui_Register_Login'
import {UIProfile} from './UIProfile'
import {GlobalContext} from '../context/GlobalState'
import {FirstRegUi} from './firstReg/FirstRegUi'

export const Ui = () => {
    const {log} = useContext(GlobalContext)
    // const   [message, setMessage] = React.useState('')
    let url_string = window.location.href;
    let url = new URL(url_string);
    let message = ''
    const validate = async () =>{
        await fetch('/validate', {
            method: 'POST',
            redirect: 'manual',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
                body: JSON.stringify({token: url.searchParams.get("token"),selec: url.searchParams.get("selec") })
        })
        .then (data =>{
            if(data.status === 403) throw data
            return data.json()
        })
        .then(data =>{
            if (data.result)
                message = 'Account confirmed'
            console.log(data)
        })
    }
    if (url.searchParams.get("token") !== undefined && url.searchParams.get("selec") !== undefined)
        validate()
    const display = (localStorage.getItem('log') === 'true' ||  log === 'true') ? 
        (localStorage.getItem("firstinput") === '1') ? <UIProfile /> : <FirstRegUi /> 
    : 
        <Ui_Register_Login message={message}/> 
    return (
        <div 
            style={{
            }}
        >
            {display}
        </div>
    )
}
