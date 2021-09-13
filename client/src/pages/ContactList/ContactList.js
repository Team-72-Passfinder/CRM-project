import React, { useEffect, useState } from 'react'

import { IconButton,  makeStyles, Paper, InputBase, Avatar, List, ListItem, ListItemAvatar, ListItemText, Fab } from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'

import { getContacts } from '../../api'
import Navbar from '../../components/Navbar/Navbar'

const useStyles = makeStyles((theme) => ({
    bodyContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inputContainer: {
        display: 'flex',
        width: '90vw',
        marginBlockStart: '20px',
        marginBlockEnd: '20px'
    },
    input: {
        marginLeft: theme.spacing(1),
        flexGrow: 3,
    },
    iconButton: {
        flexGrow: 1,
    },
    contactList: {
        width: '100vw'
    },
    contact: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '20px',
        height: '50px',
    },
    avatar: {
        marginRight: '15px',
    },
    contactName: {
        fontWeight: '500',
        fontFamily: 'Open Sans',
    },
    listContainer: {
        width: '100vw'
    },
    avatarContainer: {
        marginLeft: '5px'
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));

function ContactList() {
    const classes = useStyles();

    const [contacts, setContacts] = useState([])
    const [search, setSearch] = useState('')

    // Click on individual contact to go to detailed page.
    function handleClick(id) {
        window.location.href = '/contact/' + id
    }

    // Used to get contact list when the page loads.
    useEffect(() => {
        getContacts().then(res => {
            setContacts(res)
        })
    }, [])

    return (
        <div className={classes.root}>
            <Navbar />
            <div className={classes.bodyContent}>
                <Paper className={classes.inputContainer} elevation={3} component='form'>
                    <InputBase className={classes.input} placeholder='Search for contacts' inputProps={{ 'aria-label': 'Search for contacts' }} onChange={(e) => { setSearch(e.target.value) }} />
                    <IconButton className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <List className={classes.listContainer}>
                    {search === '' ?
                        contacts.map((element) => (
                            <ListItem id={element._id} key={element._id} button onClick={e => handleClick(element._id)}>
                                <ListItemAvatar className={classes.avatarContainer}>
                                    <Avatar className={classes.avatar}>{element.firstName[0]}</Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    {element.firstName} {element.lastName}
                                </ListItemText>
                            </ListItem>
                        ))
                        :
                        contacts.filter(contact => contact.firstName.toLowerCase().match(search) || contact.lastName.toLowerCase().match(search)).map((element) => (
                            <ListItem id={element._id} key={element._id} button onClick={e => handleClick(element._id)}>
                                <ListItemAvatar className={classes.avatarContainer}>
                                    <Avatar className={classes.avatar}>{element.firstName[0]}</Avatar>
                                </ListItemAvatar>
                                <ListItemText>
                                    {element.firstName} {element.lastName}
                                </ListItemText>
                            </ListItem>
                        ))
                    }
                </List>
                <Fab className={classes.fab} color='primary' onClick={(e) => { window.location.href = '/contact/add' }} >
                    <AddIcon />
                </Fab>
            </div>
        </div>
    )
}

export default ContactList