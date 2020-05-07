import React, { useState } from 'react'
import NavigationSuccess from './navigation/NavigationSuccess'
import FriendsCharts from './friends_charts/FriendsCharts'
import FooterSuccess from './footer/FooterSuccess'

export const UIProfile = (props) => {
        return (
            <div style={{
                display: 'inline',
                // flexDirection: 'column',
                // justifyContent: 'center',
                // height: '100%',
                width: '100%',
                border: "solid"
            }}>
                <div><NavigationSuccess /></div>
                <div><FriendsCharts /></div>
                {/* <FooterSuccess /> */}
            </div>
        )
}
