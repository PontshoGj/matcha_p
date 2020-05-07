import React, { Component } from 'react'
import Chart from './Chart'
import Friends from './Friends'
export default class FriendsCharts extends Component {
    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Chart />
                <Friends />
            </div>
        )
    }
}
