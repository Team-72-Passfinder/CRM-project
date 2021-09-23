import React, { useState } from 'react'

import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function Navbar() {
    const [open, setOpen] = useState(false)

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    function handleDrawerClose() {
        setOpen(false)
    }

    function getIcon(text) {
        switch(text) {
            case 'Home':
                return <HomeIcon sx={{ fontSize: 30 }} />
            case 'Socials':
                return <PeopleIcon sx={{ fontSize: 30 }}/>
            case 'Profile':
                return <AccountBoxIcon sx={{ fontSize: 30 }} />
            case 'Log Out':
                return <ExitToAppIcon sx={{ fontSize: 30 }} />
            default:
                return
        }
    }

    function handleDrawerItemClick(text) {
        switch (text) {
            case 'Home':
                window.location.pathname = '/'
                break;
            case 'Socials':
                window.location.pathname = '/contact-list'
                break;
            default:
                return
        }
    }

    return (
        <div>
            <AppBar sx={{ background: 'white', boxShadow: 'none' }} position='static'>
                <Toolbar>
                    <IconButton onClick={handleDrawerOpen}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer anchor={'left'} open={open}>
                <div>
                    <IconButton sx={{ marginLeft: 2, marginTop: 2 }} onClick={handleDrawerClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <List sx={{ width: '200px' }}>
                    {['Home', 'Socials', 'Profile', 'Log Out'].map((text) => (
                        <ListItem button key={text} onClick={() => handleDrawerItemClick(text)}>
                            <ListItemIcon sx={{ marginLeft: 2 }}>
                                {getIcon(text)}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    )
}

export default Navbar