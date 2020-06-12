import React, {useContext } from 'react'
import NavigationSuccess from './navigation/NavigationSuccess'
// import FriendsCharts from './friends_charts/FriendsCharts'
import FooterSuccess from './footer/FooterSuccess'
// import Chart from './friends_charts/Chart'
import {Profile} from './profile/Profile'
import {GlobalContext} from '../context/GlobalState'
import {Message} from './message/Message'
import {Friends} from './friends/Friends'
import {Match} from './match/Match'

export const UIProfile = (props) => {
    const {setLog, setLogStorage} = useContext(GlobalContext)
    // const [changeLog, setChangeLog] = React.useState(true);
    const   [display, setDisplay] = React.useState(<Profile />)
    const changeLog = () =>{
        setLog(false)
        setLogStorage(false)
    }
    const changeProfile = () =>{setDisplay(<Profile />)};
    const changeMessage = () => {setDisplay(<Message />)};
    const changeFriends = () => {setDisplay(<Friends />)};
    const changeMatch = () => {setDisplay(<Match />)};
    return (
        <div 
            style={{
                display: 'reletive',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                height: '100%',
                width: '100%',
            }}
        >
            <div
                style={{
                }}
            >
                <NavigationSuccess 
                    changeLog={changeLog} 
                    changeProfile={changeProfile}
                    changeFriends={changeFriends}
                    changeMatch={changeMatch}
                    changeMessage={changeMessage}
                />
            </div>
            <div
                style={{
                    width: '100%',
                    height: '80vh',
                }}
            >
                { display }
            </div>

            <div
                style={{
                    // gridArea: 'footer'
                }}
            >
                <FooterSuccess />
            </div>
        </div>
    )
}
