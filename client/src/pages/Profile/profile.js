import React, { useEffect, useState } from 'react'

import { Container, Box, List, ListItem, ListItemText, Typography, Avatar } from '@mui/material'
import Navbar from '../../components/Navbar/Navbar'
import { me } from '../../api'

const profileItemList = ['Email', 'Phone number', 'Date Of Birth']

function Profile() {
    const [user, setUser] = useState()

    useEffect(() => {
        me().then(res => setUser(res))
    }, [])

    function getProfileData(key) {
        switch (key) {
            case 'Name':
                return user.firstName + ' ' + user.lastName
            case 'Email':
                return user.email
            case 'Phone number':
                return user.phoneNumber
            case 'Date Of Birth':
                break;
            default:
                return undefined;

        }
    }

    return (
        <Container sx={{ width: '100vw', padding: 0 }}>
            <Navbar />
            {
                user !== undefined &&
                <React.Fragment>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} mt={5}>
                        <Avatar sx={{ width: 70, height: 70, mb: '10px' }}>
                            {user.firstName[0]}
                        </Avatar>
                        <Typography variant='h6'>
                            {user.firstName} {user.lastName}
                        </Typography>
                    </Box>
                    <List>
                        {
                            profileItemList.map((item) => {
                                let data = getProfileData(item)

                                if(data === undefined) {
                                    return null;
                                }

                                return (
                                    <ListItem key={item}>
                                        <ListItemText
                                            primary={
                                                <Typography color='textSecondary'>
                                                    {item}
                                                </Typography>
                                            }
                                            secondary={
                                                <Typography color="textPrimary">
                                                    {data}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </React.Fragment>
            }
        </Container>
    )
}

export default Profile