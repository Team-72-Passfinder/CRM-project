import React, { useEffect, useState } from 'react'

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
    title: {
        fontSize: '28px',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(3)
    },
    form: {
        display: 'flex',
        // width: '300px',
        width: '60%',
        alignItems: 'center',
        flexDirection: 'column'
    },
    formContainer: {
        display: 'flex',
        width: '100vw',
        flexDirection: 'column',
        alignItems: 'center',
    },
    TextField: {
        marginTop: '5px',
        marginBottom: '5px',
    },
    input: {
        // color: 'blue'
    },
    submitButton: {
        marginTop: '20px',
    }
}))

function CreateContact() {
    const classes = useStyles();

    const [contact, setContact] = useState({ firstName: 'none', lastName: 'none', email: 'none', phoneNumber: 'none' })
    const [submitDisabled, setSubmitDisabled] = useState(true)

    const emptyFieldErrorMessage = 'This field is required'

    function saveContact() {
        addContact(contact)
    }

    useEffect(() => {
        const inputs = document.querySelectorAll('input')
        Array.from(inputs).filter(input => {
            if(input.required === true) {
                if(!input.validity.valid) {
                    setSubmitDisabled(true)
                } else {
                    setSubmitDisabled(false)
                }
            }
        })
    }, [contact])

    return (
        <div className={classes.root}>
            <Navbar />
            <Box className={classes.formContainer}>
                <Typography className={classes.title}>
                    Create new contact
                </Typography>
                <form className={classes.form}>
                    <TextField
                        className={classes.TextField}
                        label="First Name"
                        size='small'
                        fullWidth
                        error={contact.firstName === ''}
                        onClick={e => contact.firstName === 'none' && setContact(prev => ({ ...prev, firstName: '' }))}
                        onChange={e => setContact(prev => ({ ...prev, firstName: e.target.value })) }
                        helperText={contact.firstName === '' && emptyFieldErrorMessage}
                        required
                    />
                    <TextField
                        className={classes.TextField}
                        label="Last Name"
                        size='small'
                        fullWidth
                        error={contact.lastName === ''}
                        onClick={e => contact.lastName === 'none' && setContact(prev => ({ ...prev, lastName: '' }))}
                        onChange={e => setContact(prev => ({...prev, lastName: e.target.value })) }
                        helperText={contact.lastName === '' && emptyFieldErrorMessage}
                        required
                    />
                    <TextField
                        className={classes.TextField}
                        label="Email"
                        size='small'
                        type='email'
                        fullWidth
                        error={((contact.email !== '' && contact.email !== 'none') && !/\S+@\S+\.\S+/.test(contact.email))}
                        onClick={e => contact.email === 'none' && setContact(prev => ({ ...prev, email: '' }))}
                        onChange={e => setContact(prev => ({ ...prev, email: e.target.value })) }
                        helperText={(((contact.email !== '' && contact.email !== 'none') && !/\S+@\S+\.\S+/.test(contact.email)) && 'Invalid email') }
                    />
                    <TextField
                        className={classes.TextField}
                        label="Phone Number"
                        size='small'
                        type='tel'
                        fullWidth
                        // error={contact.phoneNumber === ''}
                        onClick={e => contact.phoneNumber === 'none' && setContact(prev => ({ ...prev, phoneNumber: '' }))}
                        onChange={e => setContact(prev => ({ ...prev, phoneNumber: e.target.value })) }
                        // helperText={(contact.phoneNumber === '' && emptyFieldErrorMessage)}
                    />
                    <Button className={classes.submitButton} variant="contained" color="primary" fullWidth onClick={saveContact} disabled={submitDisabled}>
                        Save
                    </Button>
                </form>
            </Box>
        </div>
    )
}

export default CreateContact