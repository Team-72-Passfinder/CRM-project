import React, { useState, useEffect } from 'react'

import { Router, Switch, Route, Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import ProfileEdit from '../components/Settings/Profile-Edit'
import PasswordChange from '../components/Settings/PasswordChange'
import AppSettings from '../components/Settings/AppSettings'
import { me } from '../api'

import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PasswordIcon from '@mui/icons-material/Password';

import VerticalTabs from '../components/Settings/VeritcalTabs'
import Profile from './Profile/profile'

function Settings() {
    const [current, setCurrent] = useState()

    const list = [
        { label: 'Edit Profile', icon: <AccountBoxIcon />, fragment: <ProfileEdit setCurrent={setCurrent} /> },
        { label: 'Change Password', icon: <PasswordIcon />, fragment: <PasswordChange setCurrent={setCurrent} /> }
    ]

    useEffect(() => {

    }, [current])

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Navbar active="Settings" />
            <Box sx={{ display: 'flex', flexGrow: { xs: 0, sm: 1 }, flexDirection: 'column', justifyContent: { md: 'center' }, alignItems: { md: 'center' }, background: { md: '#F7F7F7' }, height: { sm: '100vh' }, width: '100%', }}>
                <Typography sx={{ display: { md: 'none' }, fontSize: '24px', background: 'white', fontWeight: 500, ml: '10px' }}>
                    Settings
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', height: { md: '60vh' }, }}>
                    <List sx={{ zIndex: { xs: 0, md: 0 }, position: { xs: 'absolute', md: 'static' }, width: { xs: '100vw', md: 'auto' }, mx: { md: '20px' }, }}>
                        {
                            list.map((element) => (
                                current !== undefined && current.label === element.label?
                                <ListItem sx={{ background: '#DF7861', color: 'white', fontWeight: 500, borderRadius: '10px', boxShadow: '4px 4px 8px rgba(223, 120, 97, 0.25)' }} onClick={e => setCurrent(element)}>
                                    <ListItemIcon sx={{ color: 'white' }}>
                                        {element.icon}
                                    </ListItemIcon>
                                    <ListItemText>
                                        {element.label}
                                    </ListItemText>
                                </ListItem>
                                :
                                <ListItem sx={{ fontWeight: 500, }} onClick={e => setCurrent(element)}>
                                    <ListItemIcon>
                                        {element.icon}
                                    </ListItemIcon>
                                    <ListItemText>
                                        {element.label}
                                    </ListItemText>
                                </ListItem>
                            ))
                        }
                    </List>
                    <Box sx={{ display: 'flex', zIndex: { xs: 1, md: 0 }, position: { xs: 'relative', md: 'static' }, background: 'white', borderRadius: { sm: '20px' }, width: { md: '700px' }, height: { md: '60vh' }, justifyContent: 'center', alignItems: 'center', boxShadow: {xs: 'none', sm: '0px 4px 4px rgba(0, 0, 0, 0.25)' }, }}>
                        {
                            current !== undefined?
                            current.fragment
                            :
                            <Typography sx={{ fontWeight: 500, display: { xs: 'none', md: 'initial' } }}>
                                Please select one of the options on the left
                            </Typography>
                        }
                    </Box>
                </Box>
            </Box>
    </Box>
  );
}

export default Settings;
