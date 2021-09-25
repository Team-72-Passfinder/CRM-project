import React, { useEffect, useState } from 'react'

import { Container, Box, Stack, Paper, Divider, InputBase, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Button, Tabs, Tab, Fab, IconButton } from '@mui/material'

import SortIcon from '@mui/icons-material/Sort';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddIcon from '@mui/icons-material/Add';

import { getContacts } from '../../api'
import Navbar from '../../components/Navbar/Navbar'

// const useStyles = makeStyles((theme) => ({
//     bodyContent: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     inputContainer: {
//         display: 'flex',
//         width: '90vw',
//         marginBlockStart: '20px',
//         marginBlockEnd: '20px',
//         background: 'rgba(0, 0, 0, 0.12)'
//     },
//     input: {
//         marginLeft: theme.spacing(1),
//         flexGrow: 3,
//     },
//     iconButton: {
//         flexGrow: 1,
//     },
//     contactList: {
//         width: '100vw'
//     },
//     contact: {
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginLeft: '20px',
//         height: '50px',
//     },
//     avatar: {
//         marginRight: '15px',
//     },
//     contactName: {
//         fontWeight: '500',
//         fontFamily: 'Open Sans',
//     },
//     listContainer: {
//         width: '100vw'
//     },
//     avatarContainer: {
//         marginLeft: '5px'
//     },
//     fab: {
//         position: 'absolute',
//         bottom: theme.spacing(2),
//         right: theme.spacing(2),
//     }
// }));

function ContactList() {
    // const classes = useStyles();

    const [contacts, setContacts] = useState([])
    const [search, setSearch] = useState('')
    const [tab, setTab] = useState('All')

    // Click on individual contact to go to detailed page.
    function handleClick(id) {
        window.location.href = '/contact/' + id
    }

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };


    // Used to get contact list when the page loads.
    useEffect(() => {
        getContacts().then(res => {
            setContacts(res)
        })
    }, [])

    // return (
    //     <div className={classes.root}>
    //         <Navbar />
    //         <div className={classes.bodyContent}>
    //             <Paper className={classes.inputContainer} elevation={3} component='form'>
    //                 <InputBase className={classes.input} placeholder='Search for contacts' inputProps={{ 'aria-label': 'Search for contacts' }} onChange={(e) => { setSearch(e.target.value) }} />
    //                 <IconButton className={classes.iconButton} aria-label="search">
    //                     <SearchIcon />
    //                 </IconButton>
    //             </Paper>
    //             <List className={classes.listContainer}>
    //                 {search === '' ?
    //                     contacts.map((element) => (
    //                         <ListItem id={element._id} key={element._id} button onClick={e => handleClick(element._id)}>
    //                             <ListItemAvatar className={classes.avatarContainer}>
    //                                 <Avatar className={classes.avatar}>{element.firstName[0]}</Avatar>
    //                             </ListItemAvatar>
    //                             <ListItemText>
    //                                 {element.firstName} {element.lastName}
    //                             </ListItemText>
    //                         </ListItem>
    //                     ))
    //                     :
    //                     contacts.filter(contact => contact.firstName.toLowerCase().match(search) || contact.lastName.toLowerCase().match(search)).map((element) => (
    //                         <ListItem id={element._id} key={element._id} button onClick={e => handleClick(element._id)}>
    //                             <ListItemAvatar className={classes.avatarContainer}>
    //                                 <Avatar className={classes.avatar}>{element.firstName[0]}</Avatar>
    //                             </ListItemAvatar>
    //                             <ListItemText>
    //                                 {element.firstName} {element.lastName}
    //                             </ListItemText>
    //                         </ListItem>
    //                     ))
    //                 }
    //             </List>
    //             <Fab className={classes.fab} color='primary' onClick={(e) => { window.location.href = '/contact/add' }} >
    //                 <AddIcon />
    //             </Fab>
    //         </div>
    //     </div>
    // )

    return (
        <Container sx={{
            padding: 0 }}>
            <Navbar />
            <Box sx={{ display: 'flex', width: '100vw', alignItems: 'center', flexDirection: 'column' }}>
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
                        <InputBase sx={{ ml: '10px', width: '296px' }} placeholder='Search for contacts' onChange={ (e) => { setSearch(e.target.value) }} />
                    </Paper>
                    <IconButton>
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
                <List>
                    {search === '' ?
                        contacts.map((element) => (
                            <ListItem
                                sx={{
                                    background: 'white',
                                    width: 368,
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
                                    width: 368,
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
            <Fab sx={{ position: 'absolute', right: 16, bottom: 16 }}>
                <SortIcon />
            </Fab>
        </Container>
    )
}

export default ContactList