import React, { useEffect, useState, useRef } from 'react'

import { Box, Stack, Paper, CircularProgress, InputBase, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Tabs, Tab, Fab, IconButton, Dialog, DialogTitle, DialogContent, Select, MenuItem, Autocomplete, TextField } from '@mui/material'

import SortIcon from '@mui/icons-material/Sort';
import AddIcon from '@mui/icons-material/Add';

import { getContacts } from '../../api'
import Navbar from '../../components/Navbar'

import AddContact from '../Contact/AddContact';

function ContactList() {
    const [contacts, setContacts] = useState([])
    const [search, setSearch] = useState('')
    const [tab, setTab] = useState('All')
    const [open, setOpen] = React.useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [sortBy, setSortBy] = useState("Recently added")
    let tags;

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

    function handleOpenDialog() {
        setOpenDialog(prev => !prev)
    }

    function sort(data) {
        return data.sort((a, b) => {
            switch (sortBy) {
                case "Oldest added":
                    return new Date(a.createdAt) - new Date(b.createdAt)
                case "Recently added":
                    return new Date(b.createdAt) - new Date(a.createdAt)
                default:
                    return new Date(b.createdAt) - new Date(a.createdAt)
            }
        })
    }

    // Used to get contact list when the page loads.
    useEffect(() => {
        getContacts().then(res => {
            console.log(sort(res))
            setContacts(sort(res))
        })
    }, [])

    useEffect(() => {
        sort(contacts)
    }, [sortBy])

    console.log(tags)

    return (
        <Box 
            sx={{
                display: 'flex',
                height: '100vh',
                minWidth: '100vw',
                width: '100vw',
                overflow: 'hidden',
                flexDirection: 'column',
                alignItems: 'center',
            }} 
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
                </Box>
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
            {/* Button to open dialog */}
            <Fab sx={{ position: 'fixed', right: 16, bottom: 16 }} onClick={handleOpenDialog}>
                <SortIcon />
            </Fab>
            {/* Add dialog content here */}
            <Dialog open={openDialog} onClose={handleOpenDialog}  fullWidth>
                <DialogTitle>
                    Search filter
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography>
                            Sort by
                        </Typography>
                        <Select 
                            value={sortBy}
                            variant="standard"
                            onChange={e => setSortBy(e.target.value)}
                            disableUnderline
                        >
                            <MenuItem value="Oldest added">
                                Oldest added
                            </MenuItem>
                            <MenuItem value="Recently added">
                                Recently added
                            </MenuItem>
                            <MenuItem value="Recently viewed">
                                Recently viewed
                            </MenuItem>
                            <MenuItem value="Least contacted">
                                Least contacted
                            </MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography>
                            Tags
                        </Typography>
                        <Autocomplete
                            id="auto"
                            multiple
                            options={['family', 'assistant']}
                            onChange={(event, newValue) => console.log(newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                />
                            )}
                        />
                    </Box>
                </DialogContent>
            </Dialog>
            <AddContact open={open} setOpen={setOpen} contacts={contacts} setContacts={setContacts} progressing={progressing} />
        </Box>
    )
}

export default ContactList