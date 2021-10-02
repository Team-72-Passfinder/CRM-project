import React from 'react'

import { Link } from 'react-router-dom'

import { Drawer, Box, Stack, IconButton, ButtonBase, ListItem, ListItemIcon, ListItemText, ListItemButton, Button } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'
import HomeIcon from '@mui/icons-material/Home'
import PeopleIcon from '@mui/icons-material/People'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

const routes = [
    {
        text: 'Home',
        path: "/home",
        exact: true,
        icon: <HomeIcon sx={{ fontSize: '36px' }} />
    },
    {
        text: "Socials",
        path: "/contact",
        icon: <PeopleIcon sx={{ fontSize: '30px' }} />
    },
    {
        text: "Profile",
        path: "/profile",
        icon: <AccountBoxIcon sx={{ fontSize: '36px' }} />
    },
    {
        text: "Log out",
        path: "/log-out",
        icon: <ExitToAppIcon sx={{ fontSize: '36px' }} />
    }
];

const activeDesktopButtonStyle ={
    display: 'flex',
    width: '50px',
    height: '50px',
    justifyContent: 'center',
    background: '#DF7861',
    color: 'white',
    borderRadius: '10px',
    boxShadow: '4px 4px 10px rgba(223, 120, 97, 0.25)',
}

function StandardDrawer({ active, open, handleDrawerToggle }) {
    return (
        <Box
            component="nav"
            sx={{ width: { sm: '120px' }, flexShrink: { sm: 0 } }}
        >
            {/* Temporary drawer for mobile screens */}
            <Drawer anchor={'left'} open={open}>
                <div>
                    <IconButton sx={{ marginLeft: 2, marginTop: 2 }} onClick={handleDrawerToggle}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Stack sx={{ width: '240px', }}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                >
                    {routes.map((route) => (
                        <Link key={route.text} to={route.path} style={{ textDecoration: 'none', width: '90%', color: 'unset' }}>
                            {
                                active === route.text ?
                                        <ListItem
                                            sx={{
                                                width: '100%',
                                                background: '#DF7861',
                                                borderRadius: '10px',
                                                color: 'white',
                                                boxShadow: '4px 4px 8px rgba(223, 120, 97, 0.25)',
                                            }}
                                        >
                                            <ListItemIcon sx={{ color: 'white', ml: 2 }}>
                                                {route.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={route.text} />
                                        </ListItem>
                                    :
                                        <ListItem
                                            sx={{
                                                width: '90%',
                                                borderRadius: '10px',
                                            }}
                                        >
                                            <ListItemIcon sx={{ ml: 2 }}>
                                                {route.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={route.text} />
                                        </ListItem>
                            }
                        </Link>
                    ))}
                </Stack>
            </Drawer>

            {/* Permanent drawer for tablet or larger screen */}
            <Drawer
                sx={{
                    display: { xs: 'none', sm: 'block' },
                }}
                variant="permanent"
            >
                <Stack
                    sx={{ width: '120px', height: '100vh', }}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                >
                    {routes.map((route) => (
                        <Link key={route.text} to={route.path}>
                            {
                                active === route.text ?

                                        <ButtonBase
                                            key={route.text}
                                            sx={activeDesktopButtonStyle}
                                            disableTouchRipple
                                        >
                                            {route.icon}
                                        </ButtonBase>

                                    :
                                        <ButtonBase
                                            key={route.text}
                                            sx={{
                                                display: 'flex',
                                                width: '50px',
                                                height: '50px',
                                                justifyContent: 'center',
                                                color: '#C4C4C4',
                                            }}
                                            disableTouchRipple
                                        >
                                            {route.icon}
                                        </ButtonBase>
                            }
                        </Link>
                    ))}
                </Stack>
            </Drawer>
        </Box>
    )
}

export default StandardDrawer