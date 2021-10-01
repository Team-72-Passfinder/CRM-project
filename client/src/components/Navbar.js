import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Stack, Box, ButtonBase } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import StandardDrawer from './StandardDrawer'

function Navbar({ active }) {
    const [open, setOpen] = useState(false)

    const handleDrawerToggle = () => {
        setOpen(!open)
    }

    return (
        <div>
            <AppBar
                position="static"
                sx={{
                    width: `100vw`,
                    display: { sm: 'none' },
                    background: 'white',
                    boxShadow: 'none',
                }}
            >
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            
            <StandardDrawer active={active} open={open} handleDrawerToggle={handleDrawerToggle} />
        </div>
    )
}

export default Navbar