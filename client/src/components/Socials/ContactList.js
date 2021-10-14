import React from 'react'

import { Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, CircularProgress, } from '@mui/material'

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
                sx={{
                    width: '368px',
                    maxWidth: '90vw',
                    overflow: 'auto',
                    display: `${(progressing.current && 'none') || 'initial'}`,
                }}
            >
                {search === '' ?
                    filter.length !== 0 ?
                        iterateContacts(contacts.filter(contact => filter.every(r => contact.tags.includes(r))), handleClick)
                        :
                        iterateContacts(contacts, handleClick)
                    :
                    filter.length !== 0 ?
                        iterateContacts(contacts.filter(contact => {
                            console.log((contact.firstName.toLowerCase().match(search.toLowerCase()) || contact.lastName.toLowerCase()));
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




{/* <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', width: { sm: '50%' } }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '0', }}>
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
            filter.length !== 0 ?
                contacts.filter(contact => filter.every(r => contact.tags.includes(r))).map((element) => (
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
            filter.length !== 0 ?
                // Filtered contacts
                contacts.filter(contact => filter.every(r => contact.tags.includes(r))).filter(contact => contact.firstName.toLowerCase().match(search.toLowerCase()) || contact.lastName.toLowerCase().match(search.toLowerCase())).map((element) => (
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
                :
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
</Box> */}