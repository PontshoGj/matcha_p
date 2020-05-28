import React, {useContext } from 'react'
import {EditionalInfo} from './EditionalInfo'
import {GlobalContext} from '../../context/GlobalState'
import Navigation from '../navigation/Navigation'
import FooterSuccess from '../footer/FooterSuccess'
import { Card } from 'react-bootstrap'

export const FirstRegUi = (props) => {
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
            <div>
                <Navigation />
            </div>
            <div
                style={{
                    height: '80vh',
                    width: '50vw',
                    marginLeft: '22vw',
                    marginTop: '4vw',
                }}
            >
                <Card >
                    <Card.Body >
                        <EditionalInfo />
                    </Card.Body>
                </Card>
            </div>
            <div>
                <FooterSuccess />
            </div>

        </div>
    )
}
