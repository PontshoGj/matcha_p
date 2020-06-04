import React, {useContext} from 'react'
import {Ui_Register_Login} from './Ui_Register_Login'
import {UIProfile} from './UIProfile'
import {GlobalContext} from '../context/GlobalState'
import {FirstRegUi} from './firstReg/FirstRegUi'

export const Ui = () => {
    const {log} = useContext(GlobalContext)

    const display = (log) ? <UIProfile /> : <Ui_Register_Login /> 
    return (
        <div style={{
        }}>
            {display}
            {/* <FirstRegUi   /> */}
        </div>
    )
}
