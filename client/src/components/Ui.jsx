import React, {useState} from 'react'
import {Ui_Register_Login} from './Ui_Register_Login'
import {UIProfile} from './UIProfile'
export const Ui = () => {
    const [log, setLogin] = useState(false)

    // const display = (log) ? <UIProfile /> : <Ui_Register_Login  setLogin={setLogin}/> 
    return (
        <div style={{
            // display: 'flex',
            // flexDirection: 'column',
            // justifyContent: 'center',
        }}>
            {/* {display} */}
            <UIProfile />
        </div>
    )
}
