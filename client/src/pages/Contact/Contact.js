import React, { useEffect, useState } from 'react'

import { AppBar, Avatar, Toolbar, Box, makeStyles, Typography, List, ListItem, ListItemIcon, ListItemText, ListItemAvatar, IconButton, Paper } from '@material-ui/core'

import EmailIcon from '@material-ui/icons/Email';
import CakeIcon from '@material-ui/icons/Cake';
import EventIcon from '@material-ui/icons/Event';

import { getContact } from '../../api'
import Email from '@material-ui/icons/Email';
import Navbar from '../../components/Navbar/Navbar';

const useStyles = makeStyles((theme) => ({
    profileContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    profileIcon: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        marginBottom: '10px',
    },
    infoContainer: {
        marginLeft: theme.spacing(2)
    },
    infoIcon: {
        marginRight: '15px',
    },
    textPrimary: {
        fontSize: '14px',
        fontWeight: '600',
    },
    hbox: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    iconContainer: {
        display: 'flex',
        width: theme.spacing(6),
        height: theme.spacing(6),
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: theme.spacing(4),
        height: theme.spacing(4)
    },
}));

function Contact() {
    const classes = useStyles();

    const [contactInfo, setContactInfo] = useState()

    function getContactData(key) {
        switch(key) {
            case 'Bio':
                return contactInfo.biography
            case 'Email':
                return contactInfo.email
            case 'Phone number':
                return contactInfo.phoneNumber
            case 'Date Of Birth':
                return (
                    new Date(contactInfo.dateOfBirth).getDate() + '/'
                    + new Date(contactInfo.dateOfBirth).getMonth() + '/'
                    + new Date(contactInfo.dateOfBirth).getFullYear()
                )
            default:
                return null;

        }
    }

    useEffect(() => {
        getContact(window.location.pathname.replace('/contact/', '')).then(res => setContactInfo(res))
    }, [])

    return (
        <div className={classes.root}>
            <Navbar />
            {
                contactInfo !== undefined &&
                <React.Fragment>
                    <Box className={classes.profileContainer} mt={5}>
                        <Avatar className={classes.profileIcon}>
                            {contactInfo.firstName[0]}
                        </Avatar>
                        <Typography variant='h6'>
                            {contactInfo.firstName} {contactInfo.lastName}
                        </Typography>
                    </Box>
                    {/* <Box className={classes.hbox}>
                        <IconButton>
                            <Paper elevation={3} className={classes.iconContainer}>
                                <EventIcon className={classes.icon} />
                            </Paper>
                        </IconButton>
                    </Box> */}
                    <List className={classes.infoContainer} dense>
                        {['Bio', 'Email', 'Phone number', 'Date Of Birth'].map((element) => {
                            let data = getContactData(element)

                            if(data === null) {
                                return
                            }

                            return (
                                <ListItem id={element} key={element}>
                                    <ListItemText
                                        primary={
                                            <Typography color='textSecondary' className={classes.textPrimary}>
                                                {element}
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
                        })}
                    </List>
                </React.Fragment>
            }
        </div>
    )
}

export default Contact