import React, { useState } from 'react'
import NavigationSuccess from './navigation/NavigationSuccess'
import FriendsCharts from './friends_charts/FriendsCharts'
import FooterSuccess from './footer/FooterSuccess'
import Chart from './friends_charts/Chart'
export const UIProfile = (props) => {
        return (
            <div style={{
                display: 'reletive',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                height: '100%',
                width: '100%',
                // grid: 'header header header header main main main footer footer footer footer', 
                // flexDirection: 'row',
                // justifyContent: 'flex-end',
                // border: "solid",
                // position: 'fixed'
                // margin: '2rem'
            }}>
                <div
                    style={{
                        // gridArea: 'header' 
                    }}
                >
                    <NavigationSuccess />
                </div>
                <div
                    style={{
                        // display: 'row',
                        // gridArea: 'main'
                    }}
                >
                    <div><FriendsCharts /></div>
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
