import React from 'react'

import { Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, CircularProgress, } from '@mui/material'

const scroll = {
    "&::-webkit-scrollbar": {
        width: "5px",
        height: "10px"
    },
    "&::-webkit-scrollbar-button": {
        width: "0px",
        height: "0px"
    },
    "&::-webkit-scrollbar-thumb": {
        background: "#999",
        borderRadius: "20px"
    },
    "&::-webkit-scrollbar-thumb:hover": {
        background: "#777"
    },
    "&::-webkit-scrollbar-thumb:active": {
        background: "#555"
    },
    "&::-webkit-scrollbar-track": {
        background: "#ccc",
        borderRadius: "2px"
    },
    "&::-webkit-scrollbar-track:hover": {
        background: "#ccc"
    },
    "&::-webkit-scrollbar-track:active": {
        background: "#ccc"
    },
    "&::-webkit-scrollbar-corner": {
        background: "transparent"
    },
}

function ContactList({ contacts, search, filter, handleClick, progressing }) {
    function handleClick(id) {
        window.location.href = '/socials/' + id
    }

    return (
        <React.Fragment>
            <Box sx={{ display: `${(progressing.current && 'flex') || 'none'}`, height: '100%', alignItems: 'center', }}>
                <CircularProgress color="primary" />
            </Box>
            <List
                sx={Object.assign({
                    width: '368px',
                    maxWidth: '90vw',
                    overflow: 'auto',
                    display: `${(progressing.current && 'none') || 'initial'}`,
                }, scroll)}
            >
                {search === '' ?
                    filter.length !== 0 ?
                        iterateContacts(contacts.filter(contact => filter.every(r => contact.tags.includes(r))), handleClick)
                        :
                        iterateContacts(contacts, handleClick)
                    :
                    filter.length !== 0 ?
                        iterateContacts(contacts.filter(contact => {
                                return (
                                    filter.every(r => contact.tags.includes(r)) 
                                    && (contact.firstName.toLowerCase().match(search.toLowerCase()) || contact.lastName.toLowerCase().match(search.toLowerCase()))
                                )}), handleClick)
                        :
                        iterateContacts(contacts.filter(contact => contact.firstName.toLowerCase().match(search.toLowerCase()) || contact.lastName.toLowerCase().match(search.toLowerCase())), handleClick)
                }
            </List>
        </React.Fragment>
    )
}

function iterateContacts(contacts, handleClick) {
    return (
        contacts.map(element => (
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
        )
        )
    )
}

export default ContactList