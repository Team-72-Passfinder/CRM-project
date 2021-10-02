import React, { useEffect, useState, useRef } from 'react'

import { Box, Container, Stack, Paper, CircularProgress, InputBase, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Tabs, Tab, Fab, IconButton, } from '@mui/material'

import SortIcon from '@mui/icons-material/Sort';
import AddIcon from '@mui/icons-material/Add';

import { getContacts } from '../../api'
import Navbar from '../../components/Navbar'

import AddContact from '../ContactList/AddContact';

function ContactList() {
    const [contacts, setContacts] = useState([])
    const [search, setSearch] = useState('')
    const [tab, setTab] = useState('All')
    const [open, setOpen] = React.useState(false)

    const progressing = useRef(false);

    // Click on individual contact to go to detailed page.
    function handleClick(id) {
        window.location.href = '/contact/' + id
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    // Used to get contact list when the page loads.
    useEffect(() => {
        getContacts().then(res => {
            setContacts(res)
        })
    }, [])

    return (
        <Box 
            sx={{
                display: 'flex',
                overflow: { xs: 'hidden', },
                flexDirection: { xs: 'column', sm: 'row' },
            }} 
        >
            <Navbar active="Socials" />
            <Box sx={{ flexGrow: { xs: 0, sm: 1 }, display: { sm: 'flex' } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: { sm: '50%' } }}>
                    {/* <Box sx={{ display: 'flex', flexDirection: 'column', padding: '0', }}> */}
                        <Stack
                            sx={{
                                width: '368px',
                                maxWidth: '90vw',
                                // position: 'absolute',
                            }}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Paper sx={{ background: '#EBEBEB', width: '316px', maxWidth: '90%', mr: '10px', my: '10px' }} elevation={0}>
                                <InputBase sx={{ ml: '10px', width: '296px', maxWidth: '90%' }} placeholder='Search for contacts' onChange={(e) => { setSearch(e.target.value) }} />
                            </Paper>
                            <IconButton onClick={handleClickOpen}>
                                <AddIcon />
                            </IconButton>
                        </Stack>
                        <Tabs
                            sx={{
                                width: '368px',
                                maxWidth: '90vw',
                                height: '40px',
                                minHeight: '30px',
                                background: '#F7F7F7',
                                borderRadius: '30px',
                                mb: '10px',
                            }}
                            TabIndicatorProps={{
                                style: {
                                    height: '100%',
                                    background: '#DF7861',
                                    borderRadius: '30px',
                                    zIndex: 0
                                },
                            }}
                            variant='fullWidth'
                            value={tab}
                            onChange={handleTabChange}
                        >
                            <Tab
                                sx={{
                                    height: '40px',
                                    minHeight: '40px',
                                    fontWeight: 600,
                                    borderRadius: '30px',
                                    '&.Mui-selected': {
                                        color: 'white',
                                        boxShadow: '4px 4px 20px 5px rgba(223, 120, 97, 0.25)',
                                        zIndex: 1
                                    }
                                }}
                                value="All"
                                label="All"
                            />
                            <Tab
                                sx={{
                                    height: '40px',
                                    minHeight: '40px',
                                    fontWeight: 600,
                                    borderRadius: '30px',
                                    '&.Mui-selected': {
                                        color: 'white',
                                        boxShadow: '-4px -4px 20px 5px rgba(223, 120, 97, 0.25)',
                                        zIndex: 1
                                    }
                                }}
                                value="User"
                                label="User"
                            />
                        </Tabs>
                    {/* </Box> */}
                    <Box sx={{ display: `${(progressing.current && 'flex') || 'none'}`, height: '100%', alignItems: 'center', }}>
                        <CircularProgress color="primary" />
                    </Box>
                    <List
                        id="list"
                        sx={{
                            width: '368px',
                            maxWidth: '90vw',
                            overflow: 'auto',
                            display: `${(progressing.current && 'none') || 'initial'}`,
                        }}>
                        {search === '' ?
                            contacts.map((element) => (
                                <ListItem
                                    sx={{
                                        background: 'white',
                                        width: 368,
                                        maxWidth: '90vw'
                                    }} id={element._id} key={element._id} button onClick={e => handleClick(element._id)}>
                                    <ListItemAvatar>
                                        <Avatar>{element.firstName[0]}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        <Typography sx={{ color: '#141010', fontWeight: 'bold', fontSize: '15px' }}>
                                            {element.firstName} {element.lastName}
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                            ))
                            :
                            // Filtered contacts
                            contacts.filter(contact => contact.firstName.toLowerCase().match(search.toLowerCase()) || contact.lastName.toLowerCase().match(search.toLowerCase())).map((element) => (
                                <ListItem
                                    sx={{
                                        background: 'white',
                                        width: '368px',
                                        maxWidth: '90vw',
                                    }} id={element._id} key={element._id} button onClick={e => handleClick(element._id)}>
                                    <ListItemAvatar>
                                        <Avatar>{element.firstName[0]}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText>
                                        <Typography sx={{ fontWeight: 'bold', fontSize: '15px' }}>
                                            {element.firstName} {element.lastName}
                                        </Typography>
                                    </ListItemText>
                                </ListItem>
                            ))
                        }
                    </List>
                </Box>
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column' }}>
                    {/* <Typography sx={{  }}>
                        Filter tags
                    </Typography> */}
                </Box>
            </Box>
            <Fab sx={{ display: { sm: 'none' }, position: 'fixed', right: 16, bottom: 16 }}>
                <SortIcon />
            </Fab>
            <AddContact open={open} setOpen={setOpen} contacts={contacts} setContacts={setContacts} progressing={progressing} />
        </Box>
    )
}

export default ContactList