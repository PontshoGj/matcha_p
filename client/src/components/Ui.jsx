import React, {useContext} from 'react'
import {Ui_Register_Login} from './Ui_Register_Login'
import {UIProfile} from './UIProfile'
import {GlobalContext} from '../context/GlobalState'
import {FirstRegUi} from './firstReg/FirstRegUi'

export const Ui = () => {
    const {log} = useContext(GlobalContext)
    const display = (localStorage.getItem('log') === 'true' ||  log === 'true') ? 
        (localStorage.getItem("firstinput") === '1') ? <UIProfile /> : <FirstRegUi /> 
    : 
        <Ui_Register_Login /> 
    return (
        <div 
            style={{
            }}
        >
            {display}
        </div>
    )
}
