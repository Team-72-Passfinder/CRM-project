import React, { useEffect, useState } from 'react'

import { AppBar, Avatar, Toolbar, Box, makeStyles, Typography, List, ListItem, ListItemIcon, ListItemText, ListItemAvatar } from '@material-ui/core'

import EmailIcon from '@material-ui/icons/Email';
import CakeIcon from '@material-ui/icons/Cake';

import { getContact } from '../../api'
import Email from '@material-ui/icons/Email';

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
    },
    infoIcon: {
        marginRight: '15px',
    },
    textPrimary: {
        fontSize: '14px',
        fontWeight: '600',
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
                return contactInfo.dateOfBirth
            default:
                return ''

        }
    }

    useEffect(() => {
        getContact(window.location.pathname.replace('/contact/', '')).then(res => setContactInfo(res))
    }, [])

    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <Toolbar>

                </Toolbar>
            </AppBar>
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
                    <List className={classes.infoContainer} dense>
                        {['Bio', 'Email', 'Phone number', 'Date Of Birth'].map((element) => {
                            let data = getContactData(element)

                            return (
                                <React.Fragment>
                                    {data !== '' &&
                                        <ListItem>
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
                                    }
                                </React.Fragment>
                            )
                        })}
                    </List>
                </React.Fragment>
            }
        </div>
    )
}

export default Contact