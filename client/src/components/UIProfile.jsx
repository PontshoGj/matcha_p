import React, {useContext } from 'react'
import NavigationSuccess from './navigation/NavigationSuccess'
import FriendsCharts from './friends_charts/FriendsCharts'
import FooterSuccess from './footer/FooterSuccess'
import Chart from './friends_charts/Chart'
import {Profile} from './profile/Profile'
import {GlobalContext} from '../context/GlobalState'

export const UIProfile = (props) => {
    const {setLog} = useContext(GlobalContext)
    // const [changeLog, setChangeLog] = React.useState(true);
    const changeLog = () =>{
        setLog(false)
    }
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
                <NavigationSuccess changeLog={changeLog}/>
            </div>
            {/* <div
                style={{
                    // display: 'row',
                    // gridArea: 'main'
                }}
            >
                <div><FriendsCharts /></div>
            </div> */}
            <div
                style={{
                    width: '100%',
                    height: '80vh',
                }}
            >
                <Profile />
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
