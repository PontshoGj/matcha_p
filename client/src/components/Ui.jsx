import React, {useContext} from 'react'
import {UiRegisterLogin} from './UiRegisterLogin'
import {UIProfile} from './UIProfile'
import {GlobalContext} from '../context/GlobalState'
import {FirstRegUi} from './firstReg/FirstRegUi'
// import {Passreset} from './passreset/Passreset'
export const Ui = () => {
    const {log} = useContext(GlobalContext)
    const   [message, setMessage] = React.useState('')
    let url_string = window.location.href;
    let url = new URL(url_string);
    // let message = ''
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
            if (data.result){
                window.location.href = window.location.origin 
                setMessage('Account confirmed')
            }
            // console.log(data)
        })
    }
    // console.log(window.location)
    const display = (localStorage.getItem('log') === 'true' ||  log === 'true') ? 
    (localStorage.getItem("firstinput") === '1') ? <UIProfile /> : <FirstRegUi /> 
    : 
    <UiRegisterLogin message={message}/> 
    if (url.pathname === '/Valid')
        validate()
    // if (url.pathname === '/Reset')
    //     display = <Passreset />
    return (
        <div 
            style={{
            }}
        >
            {display}
        </div>
    )
}
