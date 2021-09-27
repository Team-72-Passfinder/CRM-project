import React, { useState } from 'react'

import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Stack, Box } from '@mui/material'

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const drawerWidth = 200

const activeIcon = {
    fontSize: '36px',
    color: 'white',
}

const normalIcon = {
    fontSize: '36px',
}

// const drawerList = (
//     <React.Fragment>
//         {['Home', 'Socials', 'Profile', 'Log Out'].map((text) => (
//             <React.Fragment>
//                 {
//                     active === text ?
//                         <ListItem
//                             sx={{
//                                 display: 'flex',
//                                 width: '50px',
//                                 height: '50px',
//                                 justifyContent: 'center',
//                                 background: '#DF7861',
//                                 borderRadius: '10px',
//                                 boxShadow: '4px 4px 10px rgba(223, 120, 97, 0.25)'
//                             }}
//                             button
//                             key={text}
//                         // onClick={() => handleDrawerItemClick(text)}
//                         >
//                             <ListItemIcon sx={{
//                                 display: 'flex',
//                                 width: '50px',
//                                 height: '50px',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 // background: '#DF7861',
//                             }}>
//                                 {getIcon(text)}
//                             </ListItemIcon>
//                         </ListItem>
//                         :
//                         <ListItem
//                             sx={{
//                                 display: 'flex',
//                                 width: '50px',
//                                 height: '50px',
//                                 justifyContent: 'center',
//                                 // background: '#DF7861',
//                             }}
//                             button
//                             key={text}
//                         // onClick={() => handleDrawerItemClick(text)}
//                         >
//                             <ListItemIcon sx={{
//                                 display: 'flex',
//                                 width: '50px',
//                                 height: '50px',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                                 // background: "#DF7861"
//                             }}>
//                                 {getIcon(text)}
//                             </ListItemIcon>
//                         </ListItem>
//                 }
//             </React.Fragment>
//         ))}
//     </React.Fragment>
// )

function Navbar({ active }) {
    const [open, setOpen] = useState(false)

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    function handleDrawerClose() {
        setOpen(false)
    }

    function getIcon(text) {
        let style;

        if(text === active) {
            style = activeIcon
        } else {
            style = normalIcon
        }

        switch(text) {
            case 'Home':
                return <HomeIcon sx={style} />
            case 'Socials':
                return <PeopleIcon sx={style}/>
            case 'Profile':
                return <AccountBoxIcon sx={style} />
            case 'Log Out':
                return <ExitToAppIcon sx={style} />
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
                window.location.pathname = '/contact'
                break;
            default:
                return
        }
    }

    return (
        <div>
            <AppBar
                position="static"
                sx={{
                    width: `100vw`,
                    ml: { sm: `${drawerWidth}px` },
                    display: { sm: 'none' },
                    background: 'white',
                    boxShadow: 'none',
                }}
            >
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerOpen}
                        sx={{ display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            
            {/* Temporary drawer for mobile screens */}
            <Drawer anchor={'left'} open={open}>
                <div>
                    <IconButton sx={{ marginLeft: 2, marginTop: 2 }} onClick={handleDrawerClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Stack sx={{ width: '240px' }} 
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                >
                    {['Home', 'Socials', 'Profile', 'Log Out'].map((text) => (
                        <React.Fragment>
                            {
                                active === text?
                                    <ListItem 
                                        sx={{ 
                                            width: '90%',
                                            background: '#DF7861',
                                            borderRadius: '10px',
                                            color: 'white',
                                            boxShadow: '4px 4px 8px rgba(223, 120, 97, 0.25)'
                                        }} button key={text} onClick={() => handleDrawerItemClick(text)}>
                                        <ListItemIcon sx={{ marginLeft: 2 }}>
                                            {getIcon(text)}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                :
                                    <ListItem 
                                        sx={{
                                            width: '90%',
                                            borderRadius: '10px',
                                        }} button key={text} onClick={() => handleDrawerItemClick(text)}>
                                        <ListItemIcon sx={{ marginLeft: 2 }}>
                                            {getIcon(text)}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItem>
                            }
                        </React.Fragment>
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
                    sx={{
                        width: '120px',
                        height: '100vh',
                    }}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                >
                    {['Home', 'Socials', 'Profile', 'Log Out'].map((text) => (
                        <React.Fragment>
                            {
                                active === text?
                                <ListItem
                                    sx={{
                                        display: 'flex',
                                        width: '50px',
                                        height: '50px',
                                        justifyContent: 'center',
                                        background: '#DF7861',
                                        borderRadius: '10px',
                                        boxShadow: '4px 4px 10px rgba(223, 120, 97, 0.25)'
                                    }}
                                    button 
                                    key={text} 
                                    // onClick={() => handleDrawerItemClick(text)}
                                >
                                        <ListItemIcon sx={{
                                            display: 'flex',
                                            width: '50px',
                                            height: '50px',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            // background: '#DF7861',
                                        }}> 
                                            {getIcon(text)}
                                        </ListItemIcon>
                                </ListItem>
                                :
                                <ListItem
                                    sx={{
                                        display: 'flex',
                                        width: '50px',
                                        height: '50px',
                                        justifyContent: 'center',
                                        // background: '#DF7861',
                                    }}
                                    button
                                    key={text}
                                // onClick={() => handleDrawerItemClick(text)}
                                >
                                    <ListItemIcon sx={{
                                        display: 'flex',
                                        width: '50px',
                                        height: '50px',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        // background: "#DF7861"
                                    }}>
                                        {getIcon(text)}
                                    </ListItemIcon>
                                </ListItem>
                            }
                        </React.Fragment>
                    ))}
                </Stack>
            </Drawer>
        </div>
    )
}

export default Navbar