import React, { useState } from 'react'

import { Typography, TextField, Button, makeStyles, Box } from '@material-ui/core'

import Navbar from '../../components/Navbar/Navbar'
import { addContact } from '../../api';

const useStyles = makeStyles((theme) => ({
    // loot: {
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     // width: '100vw',
    //     // height: '100vh',
    //     background:'red'
    // },
    formContainer: {
        display: 'flex',
        width: '100vw',
        justifyContent: 'center'
    },
    form: {
        display: 'flex',
        // width: '300px',
        width: '60%',
        alignItems: 'center',
        flexDirection: 'column'
    },
}))

function CreateContact() {
    const classes = useStyles();

    const [contact, setContact] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '' })

    function saveContact() {
        addContact(contact)
    }

    return (
        <div className={classes.root}>
            <Navbar />
            <Typography variant='h4'>
                Create new contact
            </Typography>
            <Box className={classes.formContainer}>
                <form className={classes.form}>
                    <TextField label="First Name" variant="filled" size='small' onChange={e => setContact(prev => ({...prev, firstName: e.target.value })) } />
                    <TextField label="Last Name" variant="filled" size='small' onChange={e => setContact(prev => ({...prev, lastName: e.target.value })) } />
                    <TextField label="Email" variant="filled" size='small' onChange={e => setContact(prev => ({ ...prev, email: e.target.value })) } />
                    <TextField label="Phone Number" variant="filled" size='small' onChange={e => setContact(prev => ({ ...prev, phoneNumber: e.target.value })) } />
                    <Button variant="contained" color="primary" onClick={saveContact}>
                        Save
                    </Button>
                </form>
            </Box>
            {/* <form className={classes.form} display='block'> */}
            {/* </form> */}
        </div>
    )
}

export default CreateContact