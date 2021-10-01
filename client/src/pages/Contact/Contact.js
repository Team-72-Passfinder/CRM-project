import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { Box, Avatar, Typography, Stack, Button } from '@mui/material'

import { getContact, getEventById } from '../../api'
import Navbar from '../../components/Navbar';
import IconPillTabs from '../../components/Contact/IconPillTabs';
import Profile from '../../components/Contact/Profile';
import Events from '../../components/Contact/Events';

function Contact() {
    const [contactInfo, setContactInfo] = useState()
    const [events, setEvents] = useState([])
    const [tab, setTab] = useState('Profile')

    useEffect(() => {
        getContact(window.location.pathname.replace('/contact/', '')).then(res => { 
            setContactInfo(res)
            res.events.map((event) => {
                getEventById(event).then(res => {
                    setEvents(prev => [...prev, res]);
                })
            })
        })
    }, [])

    useEffect(() => {
        getContact(window.location.pathname.replace('/contact/', '')).then(res => setContactInfo(res))
        setEvents([])
        switch(tab) {
            case "Events":
                contactInfo.events.map((event) => {
                    getEventById(event).then(res => {
                        setEvents(prev => [...prev, res]);
                    }) 
                })
                break;
            default:
                break;
        }
    }, [tab])

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleClick = () => {
        window.location.href = '/contact/edit/' + contactInfo._id
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Navbar active="Socials" />
            <Box sx={{ flexGrow: { sm: 1, }, background: '#F7F7F7', }} >
                {
                    contactInfo !== undefined &&
                    <Box sx={{ display: 'flex', height: { sm: '100vh' }, alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, background: '#F7F7F7', }}>
                        <Box sx={{ display: 'flex', width: { sm: '50%' }, height: '80vh', flexDirection: 'column', alignItems: 'center', }}>
                            <Box sx={{ my: '10px', }}>
                                <Avatar sx={{ width: '80px', height: '80px', fontSize: '28px' }} alt={contactInfo.firstName} src="/broken-image.jpg" />
                            </Box>
                            <Typography sx={{ fontSize: '18px', fontWeight: 700, color: '#272727' }}>
                                {contactInfo.firstName} {contactInfo.lastName}
                            </Typography>
                            <Button sx={{ display: { xs: 'none', sm: 'flex' } }} variant="contained" onClick={handleClick}>
                                Edit Profile
                            </Button>
                            <IconPillTabs profilePanel={<Profile info={contactInfo} />} eventsPanel={<Events events={events} />} tab={tab} handleTabChange={handleTabChange}  />
                            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                                <Profile info={contactInfo} />
                            </Box>
                        </Box>
                        <Box sx={{ display: { xs: 'none', sm: 'flex' }, height: '80vh', flexDirection: 'column', alignItems: 'center', }}>
                            <Box sx={{ display: 'flex', justifyContent: 'left', width: '100%' }}>
                                <Typography sx={{ fontSize: '28px', fontWeight: 700 }}>
                                    Events
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', }}>
                                <Stack>
                                    <Events events={events} />
                                </Stack>
                                
                            </Box>
                        </Box>
                    </Box>
                } 
            </Box>
        </Box>
    )
}

export default Contact