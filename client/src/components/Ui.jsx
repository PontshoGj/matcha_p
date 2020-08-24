import React, {useContext} from 'react'
import {UiRegisterLogin} from './UiRegisterLogin'
import {UIProfile} from './UIProfile'
import {Uiadmin} from './Uiadmin'
import {GlobalContext} from '../context/GlobalState'
import {FirstRegUi} from './firstReg/FirstRegUi'
// import {Passreset} from './passreset/Passreset'
export const Ui = () => {
    const {log} = useContext(GlobalContext)
    const   [message, setMessage] = React.useState('')
    const   [display, setDisplay] = React.useState()
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
    setTimeout(()=>{

        // console.log(localStorage.getItem("admin"))
        let view = (localStorage.getItem("admin") === '1')? <Uiadmin />:<UIProfile />
        let view2 =  (localStorage.getItem("firstinput") !== '1') ? <FirstRegUi />:view  
        setDisplay((localStorage.getItem('log') === 'true' ||  log === 'true') ? view2: <UiRegisterLogin message={message}/>)
    }, 3000)

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
