import React, { Component } from 'react'

export default class FooterSuccess extends Component {
    render() {
        return (
            <div
                style={{
                    display: 'reletive',
                    // marginTop: '5vh',
                    position: 'bottom',
                    // borderTop: 'solid',
                    // paddingTop: '1vh',
                    position: "bottom fixed"
                }}
            >
                <hr />
                <p>matcha&copy;</p>
            </div>
        )
    }
}
