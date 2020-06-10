import React from 'react'
import { First } from './First'
// import { Second } from './Second'
// import { Third } from './Third'

export const EditionalInfo = () => {
    const   [display, setDisplay] = React.useState(null)

    return (
        <div 
            style={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <>
                {(display)? display : <First setDisplay={setDisplay}/>}
            </>
        </div>
    )
}
