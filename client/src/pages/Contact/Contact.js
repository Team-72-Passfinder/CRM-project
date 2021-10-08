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

    let id = window.location.pathname.split('/')[2];
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
        switch (tab) {
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
                    <Box sx={{ display: 'flex', height: { sm: '100vh' }, alignItems: 'center', justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' }, background: '#F7F7F7', }}>
                        <Box sx={{ display: 'flex', height: '80vh', flexDirection: 'column', alignItems: 'center', }}>
                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'center' }}>
                                <Box sx={{ my: '10px', mr: { sm: '20px' } }}>
                                    <Avatar sx={{ width: '80px', height: '80px', fontSize: '28px' }} alt={contactInfo.firstName} src="/broken-image.jpg" />
                                </Box>
                                <Typography sx={{ fontSize: { xs: '18px', sm: '24px' }, fontWeight: 700, color: '#272727' }}>
                                    {contactInfo.firstName} {contactInfo.lastName}
                                </Typography>
                            </Box>
                            <Button sx={{ display: { xs: 'none', sm: 'flex' } }} variant="contained" onClick={handleClick}>
                                Edit Profile
                            </Button>
                            <IconPillTabs profilePanel={<Profile info={contactInfo} />} eventsPanel={<Events events={events} />} tab={tab} handleTabChange={handleTabChange} setTab={setTab} />
                        </Box>
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default Contact