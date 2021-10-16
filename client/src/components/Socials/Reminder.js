import React, { useEffect, useState } from 'react'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, } from '@mui/material'
import { getContactsForReminder, getEventsFromContactId } from '../../api';

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

 
function Reminder({ contacts }) {
    const [uncontact, setUncontact] = useState([]);
    const [close, setClose] = useState(true);

    useEffect(() => {
        let today = new Date()
        let past = new Date(new Date().setDate(today.getDate() - 30))

        let body = {
            from: past,
            to: today,
        }
        getContactsForReminder(body).then(res => setUncontact(res));
    }, [])

    useEffect(() => {
        if(uncontact.length !== 0) {
            setClose(!close)
        }
    }, [uncontact])

    const handleClose = () => {
        setClose(!close)
    };

    function handleClick(id) {
        window.location.href = '/socials/' + id
    }

    return (
        <Dialog onClose={handleClose} open={!close}>
            <DialogTitle>
                Reminder to contact others!
                <Typography sx={{ fontSize: '14px', fontWeight: 400 }} align='left'>
                    Hey, it appears you haven't had any events or been in touch with them for a while!
                </Typography>
            </DialogTitle>
            <DialogContent sx={Object.assign({ }, scroll)}>
                <List>
                    {
                        uncontact.length !== 0 && 
                        uncontact.names.map((name, i) => (
                        <ListItem key={uncontact.contactIds[i]} button onClick={e => handleClick(uncontact.contactIds[i])}>
                            <ListItemAvatar>
                                <Avatar>{name[0]}</Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography sx={{ color: '#141010', fontWeight: 'bold', fontSize: '15px' }}>
                                    {name}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        ))
                    }
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Okay
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Reminder