import React from 'react'
import {Button, ButtonGroup} from 'react-bootstrap'
import { EditProfile } from './EditProfile'
import { BioProfile } from './BioProfile'

export const Profile = () => {
    return (
        <div style={{
            display: 'column',
            // flexDirection: 'column',
            paddingTop: '20vh',
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
                    fontSize: '2vw'
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
                <div>
                    <ButtonGroup vertical>
                        <Button bg="dark"  type='submit' size='lg'  style={{width: '25vw', marginLeft: '5vw', marginTop: '3vh'}} block>Profile</Button>
                        <Button bg="dark" type='submit' size='lg'  style={{width: '25vw', marginLeft: '5vw', marginTop: '3vh'}} block>Email</Button>
                        <Button bg="dark" type='submit' size='lg'  style={{width: '25vw', marginLeft: '5vw', marginTop: '3vh'}} block>Bio</Button>
                        <Button bg="dark" type='submit' size='lg'  style={{width: '25vw', marginLeft: '5vw', marginTop: '3vh'}} block>Loaction</Button>
                        <Button bg="dark" type='submit' size='lg'  style={{width: '25vw', marginLeft: '5vw', marginTop: '3vh'}} block>Password</Button>

                    </ButtonGroup>
                </div>
                <div>
                    <BioProfile />
                    {/* <EditProfile /> */}
                </div>
            </div>
        </div>
    )
}
