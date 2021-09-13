import React, { useState } from 'react'

import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
    list: {
        width: '200px',
    },
    closeButton: {
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    ListItem: {
        marginLeft: theme.spacing(1),
    },
    listIcon: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    }
}))

function Navbar() {
    const classes = useStyles()

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
                return <HomeIcon className={classes.listIcon} />
            case 'Socials':
                return <PeopleIcon className={classes.listIcon} />
            case 'Profile':
                return <AccountBoxIcon className={classes.listIcon} />
            case 'Log Out':
                return <ExitToAppIcon className={classes.listIcon} />
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
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={handleDrawerOpen}>
                        <MenuIcon htmlColor='white' />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer anchor={'left'} open={open}>
                <div>
                    <IconButton className={classes.closeButton} onClick={handleDrawerClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <List className={classes.list}>
                    {['Home', 'Socials', 'Profile', 'Log Out'].map((text) => (
                        <ListItem className={classes.ListItem} button key={text} onClick={() => handleDrawerItemClick(text)}>
                            <ListItemIcon>
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