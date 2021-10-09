import React, { useEffect, useState } from 'react'

import { Box, Dialog, Slide, IconButton, AppBar, Toolbar, Typography, Avatar, FilledInput, FormControl, Button, Alert } from '@mui/material'

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs'
import DatePicker from '@mui/lab/DatePicker';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import StandardInput from '../../components/StandardInput';
import AutoComplete from '../../components/AutoComplete';

import { addContact, getContacts } from '../../api';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AddContact({ open, setOpen, setContacts, progressing }) {
    const [contact, setContact] = useState({
        firstName: 'none',
        lastName: 'none',
        email: '',
        phoneNumber: '',
        dateOfBirth: new Date(),
        biography: '',
        jobTitle: [],
        tags: []
    })
    const [submitDisabled, setSubmitDisabled] = useState(true)
    const [alert, setAlert] = useState()

    const handleClose = () => {
        setOpen(false);
    };

    function saveContact() {
        addContact(contact).then(res => {
            if (contact.firstName === res.firstName && contact.lastName === res.lastName) {
                progressing.current = true
                handleClose();
                getContacts().then(res => {
                    setTimeout(() => {
                        progressing.current = false
                        setContacts(res)
                    }, 200)
                })
            }
        }, reason => {
            setAlert(
                <Alert severity='error'>
                    Failed to save contact
                </Alert>
            )
        })
    }

    useEffect(() => {
        const inputs = document.querySelectorAll('input')

        Array.from(inputs).filter(input => {
            if (input.required === true) {
                // console.log(contact)
                if (!input.validity.valid) {
                    setSubmitDisabled(true)
                } else {
                    setSubmitDisabled(false)
                }
            }
        })
    }, [contact])

    useEffect(() => {
        if (contact.firstName === '' || contact.lastName === '') {
            setSubmitDisabled(true);
        } else {
            setSubmitDisabled(false);
        }
    }, [contact])

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ background: 'white', boxShadow: 'none' }} position="static">
                <Toolbar>
                    <IconButton
                        sx={{
                            color: 'black'
                        }}
                        edge="start"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box sx={{ display: 'flex', width: '100vw', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ width: '300px', justifyContent: 'left', mt: '10px', mb: '20px' }}>
                    <Typography sx={{ fontSize: '24px', fontWeight: 700 }}>
                        Contact form
                    </Typography>
                </Box>
                {alert}
                <div key='avatar'>
                    <input id='uploadImage' accept='image/*' type='file' style={{ display: 'none' }} />
                    <label htmlFor='uploadImage'>
                        <Avatar
                            key='avatar'
                            sx={{
                                width: 70, height: 70
                            }}
                        >
                            <AddAPhotoIcon />
                        </Avatar>
                    </label>
                </div>
                <StandardInput id="firstName" label='First name' name='firstName' value={contact.firstName} setValue={setContact} required={true} type='text' />
                <StandardInput id="lastName" label='Last name' name='lastName' value={contact.lastName} setValue={setContact} required={true} type='text' />
                <StandardInput id="email" label='Email' name='email' value={contact.email} setValue={setContact} required={false} type='email' />
                <StandardInput id="phoneNumber" label='Phone number' name='phoneNumber' value={contact.phoneNumber} setValue={setContact} required={false} type='tel' />
                <StandardInput id="biography" label='Biography' name='biography' value={contact.biography} setValue={setContact} required={false} type='text' />
                <AutoComplete id="jobTitle" label="Job Title" name="jobTitle" value={contact.jobTitle} setValue={setContact} />
                <AutoComplete id="tags" label="Tags" name="tags" value={contact.tags} setValue={setContact} />
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <FormControl margin="dense" variant="filled">
                        <Typography sx={{ fontSize: '15px', fontWeight: 600 }} margin="none">
                            Date of birth
                        </Typography>
                        <DatePicker
                            id="dateOfBirth"
                            value={contact.dateOfBirth}
                            disableFuture
                            onChange={(newValue) => {
                                setContact(prev => ({ ...prev, dateOfBirth: newValue }))
                            }}
                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FilledInput
                                        sx={{
                                            width: '300px',
                                            height: '40px',
                                            borderRadius: '5px',
                                            '&.Mui-error': {
                                                background: '#FBB5B1',
                                                border: '1px solid #F9202B',
                                            },
                                            '& input:not(:placeholder-shown)': {
                                                height: '0px',
                                            }
                                        }}
                                        disableUnderline={true}
                                        hiddenLabel={true}
                                        endAdornment={
                                            InputProps?.endAdornment
                                        }
                                        ref={inputRef}
                                        {...inputProps}
                                    />
                                </Box>
                            )}
                        />
                    </FormControl>
                </LocalizationProvider>
                <Button sx={{ width: 300, my: '10px', '&.MuiButton-disableElevation': { boxShadow: `(${submitDisabled} && 'none') || '4px 4px 20px 5px rgba(223, 120, 97, 0.25)'` } }} color="primary" variant="contained" disableElevation disabled={submitDisabled} onClick={saveContact}>
                    Save
                </Button>
            </Box>
        </Dialog>
    )
}

export default AddContact