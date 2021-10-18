import React, { useState, useEffect } from 'react'

import { Router, Switch, Route, Link } from 'react-router-dom' 

import Navbar from '../components/Navbar'
import ProfileEdit from '../components/Settings/Profile-Edit'
import PasswordChange from '../components/Settings/PasswordChange'
import { me } from '../api'

import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'
import VerticalTabs from '../components/Settings/VeritcalTabs'
import Profile from './Profile/profile'

function Settings() {
    const [current, setCurrent] = useState()

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Navbar active="Settings" />
            <Box sx={{ display: 'flex', flexGrow: { xs: 0, sm: 1 }, flexDirection: 'column', justifyContent: { md: 'center' }, alignItems: { md: 'center' }, background: { md: '#F7F7F7' }, height: { sm:'100vh' }, width: '100%', }}>                    
                <Typography sx={{ display: { md: 'none' }, fontSize: '24px', background: 'white', fontWeight: 500, ml: '10px' }}>
                    Settings
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', height: { md: '60vh' } }}>
                    <List sx={{ zIndex: { xs: 0, md: 0 }, position: { xs: 'absolute', md: 'static' }, width: { xs: '100vw', md: 'auto' } }}>
                        <ListItem onClick={e => setCurrent(<ProfileEdit setCurrent={setCurrent} />)}>
                            <ListItemText>
                                Edit Profile
                            </ListItemText>
                        </ListItem>
                        <ListItem onClick={e => setCurrent(<PasswordChange setCurrent={setCurrent} />)}>
                            <ListItemText>
                                Change Password
                            </ListItemText>
                        </ListItem>
                    </List>
                    <Box sx={{ display: 'flex', zIndex: { xs: 1, md: 0 }, position: { xs: 'relative', md: 'static' }, background: 'white', width: { md: '40vw' }, height: { md: '60vh' }, justifyContent: 'center' }}>
                        {current}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Settings