import React from 'react'
import {Button, ButtonGroup} from 'react-bootstrap'
import { EditProfile } from './EditProfile'
import { BioProfile } from './BioProfile'
import { EmailProfile} from './EmailProfile'
import { PasswordProfile } from './PasswordProfile'
import { Location } from './Location'
import { ProfilePic } from './ProfilePic'

export const Profile = () => {
    const [display, setDisplay] = React.useState(<EditProfile />);

    const  editProfile = () => {setDisplay(<EditProfile />);}
    const  passwordProfile = () => {setDisplay(<PasswordProfile />);}
    const  bioProfile = () => {setDisplay(<BioProfile />);}
    const  emailProfile = () => {setDisplay(<EmailProfile />);}
    const  location = () => {setDisplay(<Location />);}
    const  picture = () => {setDisplay(<ProfilePic />);}
    return (
        <div style={{
            display: 'column',
            // flexDirection: 'column',
            paddingTop: '10vh',
            width: '100%',
            overflow: 'auto',
            // border: 'solid'
            height: '80vh'
        }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    fontSize: '3.5vw'
                    // border: 'solid'
                }}
            >
                Profile
            </div>
            <div
                style={{
                    display: 'flex',
                    // border: 'solid'
                }}
            >
                <div
                    style={{
                        borderRight: 'solid .1vw',
                        paddingRight: '2vw'

                    }}
                >
                    <ButtonGroup vertical>
                        <Button variant="dark"  type='submit' size='lg' onClick={editProfile}  style={{width: '25vw', marginLeft: '5vw', marginTop: '3vh'}} block>Profile</Button>
                        <Button variant="dark" type='submit' size='lg'  onClick={emailProfile}  style={{width: '25vw', marginLeft: '5vw', marginTop: '3vh'}} block>Email</Button>
                        <Button variant="dark" type='submit' size='lg'  onClick={bioProfile} style={{width: '25vw', marginLeft: '5vw', marginTop: '3vh'}} block>Bio</Button>
                        <Button variant="dark" type='submit' size='lg'  onClick={location} style={{width: '25vw', marginLeft: '5vw', marginTop: '3vh'}} block>Loaction</Button>
                        <Button variant="dark" type='submit' size='lg'  onClick={passwordProfile} style={{width: '25vw', marginLeft: '5vw', marginTop: '3vh'}} block>Password</Button>
                        <Button variant="dark" type='submit' size='lg'  onClick={picture} style={{width: '25vw', marginLeft: '5vw', marginTop: '3vh'}} block>Pictures</Button>

                    </ButtonGroup>
                </div>
                <div>
                    {display}
                </div>
            </div>
        </div>
    )
}
