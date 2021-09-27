import React, { useEffect, useState } from 'react'

import { Container, Box, Stack, Paper, Divider, InputBase, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Toolbar, Button, Tabs, Tab, Fab, IconButton, Slide } from '@mui/material'

import SortIcon from '@mui/icons-material/Sort';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddIcon from '@mui/icons-material/Add';

import { getContacts } from '../../api'
import Navbar from '../../components/Navbar'

// import CreateContact from '../CreateContact/CreateContact'
import AddContact from '../Contact/AddContact';

function ContactList() {
    const [contacts, setContacts] = useState([])
    const [search, setSearch] = useState('')
    const [tab, setTab] = useState('All')
    const [open, setOpen] = React.useState(false)

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
        // <div>
        <Container 
            sx={{
                padding: 0,
                height: '100vh',
                minWidth: '100vw',
                width: '100vw',
                overflow: 'hidden',
            }} 
            maxWidth={false}
        >
            <Navbar active="Socials" />
            <Box sx={{ display: 'flex', width: '100vw', alignItems: 'center', flexDirection: 'column', }}>
                <Stack
                    sx={{
                        width: '368px',
                        maxWidth: '90vw',
                    }}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Paper sx={{ background: '#EBEBEB', width: '316px', maxWidth: '90%', mr: '10px', my: '10px' }} elevation={0}>
                        <InputBase sx={{ ml: '10px', width: '296px', maxWidth: '90%' }} placeholder='Search for contacts' onChange={ (e) => { setSearch(e.target.value) }} />
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
                <Box sx={{ display: 'flex', width: '100vw', height: '90vh', justifyContent:'center', overflowY: 'scroll' }}>
                    <List
                        sx={{
                            width: '368px',
                            maxWidth: '90vw',
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
                                        <Typography sx={{ color: '#2F4858', fontWeight: 'bold', fontSize: '15px' }}>
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
            </Box>
            <Fab sx={{ position: 'fixed', right: 16, bottom: 16 }}>
                <SortIcon />
            </Fab>
            <AddContact open={open} setOpen={setOpen} />
        </Container>
        // {/* </div> */}
    )
}

export default ContactList