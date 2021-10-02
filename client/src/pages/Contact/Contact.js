import React, { useEffect, useState } from 'react'

// import { AppBar, Avatar, Toolbar, Box, makeStyles, Typography, List, ListItem, ListItemIcon, ListItemText, ListItemAvatar, IconButton, Paper } from '@material-ui/core'

import { Box, Avatar, Typography, Stack, List, ListItem, ListItemText, ListItemButton } from '@mui/material'

import PersonIcon from '@mui/icons-material/Person';

import { getContact } from '../../api'
import Navbar from '../../components/Navbar';

function Contact() {
    const [contactInfo, setContactInfo] = useState()

    useEffect(() => {
        getContact(window.location.pathname.replace('/contact/', '')).then(res => setContactInfo(res))
    }, [])

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

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Navbar active="Socials" />
            <Box sx={{ flexGrow: { sm: 1, } }} >
                {
                    contactInfo !== undefined &&
                    <React.Fragment>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                            <Box sx={{ my: '10px' }}>
                                <Avatar sx={{ width: '80px', height: '80px', fontSize: '28px' }} alt={contactInfo.firstName} src="/broken-image.jpg" />
                            </Box>
                            <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>
                                {contactInfo.firstName} {contactInfo.lastName}
                            </Typography>
                            <Stack direction="row">
                                <ListItem>
                                    <ListItemButton sx={{ borderRadius: '10px' }}>
                                        <PersonIcon />
                                    </ListItemButton>
                                </ListItem>
                            </Stack>
                            <Stack>
                                {
                                    ['Bio', 'Email', 'Phone number', 'Date Of Birth'].map((item) => {
                                        let data = getContactData(item)

                                        if (data === "") {
                                            return null
                                        }

                                        return (
                                            <Box sx={{ my: '5px' }}>
                                                <Typography sx={{ fontSize: '14px', fontWeight: 400 }} color='textSecondary'>
                                                    {item}
                                                </Typography>
                                                <Typography sx={{ fontSize: '16px', fontWeight: 500 }} color='textPrimary'>
                                                    {data}
                                                </Typography>
                                            </Box>
                                        )
                                    })
                                }
                            </Stack>
                        </Box>
                    </React.Fragment>
                }
            </Box>
        </Box>
    )
}

export default Contact