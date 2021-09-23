import React, { useEffect, useState } from 'react'

import { Stack, Avatar, TextField, Box, Button } from '@mui/material';

import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateAdapter from '@mui/lab/AdapterDayjs'
import DatePicker from '@mui/lab/DatePicker'

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import { getContact, save } from '../../api';
import Navbar from '../../components/Navbar/Navbar';

const formList = [
    {
        label: 'First Name',
        type: 'text',
        required: true,
    },
    {
        label: 'Last Name',
        type: 'text',
        required: true,
    },
    {
        label: 'Date of Birth',
        type: 'date',
    },
    {
        label: 'Email',
        type: 'email',
    },
    {
        label: 'Phone number',
        type: 'tel',
    }
]

function EditContact() {
    // const classes = useStyles()

    const [contact, setContact] = useState()

    const emptyFieldErrorMessage = 'This field is required'
    const invalidEmailErrorMessage = 'invalid email'
    const invalidTelErrorMessage = 'Must only contain numbers'

    useEffect(() => {
        getContact(window.location.pathname.split('/')[3]).then(res => setContact(res))
    }, [])

    function callSave() {
        save(contact)
    }

    function getContactData(key) {
        switch (key) {
            case 'First Name':
                return contact.firstName
            case 'Last Name':
                return contact.lastName
            case 'Bio':
                return contact.biography
            case 'Email':
                return contact.email
            case 'Phone number':
                return contact.phoneNumber
            case "Date of Birth":
                return new Date(contact.dateOfBirth)
            default:
                return null;

        }
    }

    function setContactData(key, value) {
        switch(key) {
            case 'First Name':
                setContact(prev => ({ ...prev, firstName: value }))
                break;
            case 'Email':
                setContact(prev => ({ ...prev, email: value }))
                break;
            case 'Date of Birth':
                setContact(prev => ({ ...prev, dateOfBirth: value }))
                break;
            case 'Phone number':
                setContact(prev => ({ ...prev, phoneNumber: value }))
                break
            default:
                break;
        }
    }

    function generateHelperText(element) {
        if(element.required) {
            return (getContactData(element.label) === '' && emptyFieldErrorMessage)
        }

        if (getContactData(element.label) !== '') {
            switch (element.type) {
                case 'email':
                    return !/\S+@\S+\.\S+/.test(contact.email) && invalidEmailErrorMessage
                case 'tel':
                    return isNaN(contact.phoneNumber) && invalidTelErrorMessage
                default:
            }
        }
    }

    function isError(element) {
        if (element.required) {
            return getContactData(element.label) === ''
        }

        if (getContactData(element.label) !== '') {
            switch (element.type) {
                case 'email':
                    return !/\S+@\S+\.\S+/.test(contact.email)
                case 'tel':
                    return isNaN(contact.phoneNumber) && invalidTelErrorMessage
                default:

            }
        }
    }

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <div>
                <Navbar />
                <Stack sx={{ my: 2 }}
                    alignItems='center'
                    spacing={2}
                    // sx={{ background: 'red' }}
                >
                <div key='avatar'>
                    <input id='uploadImage' accept='image/*' type='file' style={{display: 'none'}} />
                    <label htmlFor='uploadImage'>
                        {contact !== null || contact.avatar === ''?
                            (
                                <Avatar
                                key='avatar'
                                    sx={{
                                        width: 70, height: 70
                                    }}
                                >
                                    <AddAPhotoIcon />
                                </Avatar>
                            )
                            :
                            (
                                <Avatar>

                                </Avatar>
                            )
                        }
                    </label>
                </div>
                    {
                        contact &&
                        <React.Fragment>
                            {
                                contact !== undefined &&
                                formList.map((element) => {
                                    switch(element.type) {
                                        case 'date':
                                            return(
                                                <React.Fragment key={element.label}>
                                                    <DatePicker
                                                        disableFuture
                                                        label={element.label}
                                                        value={getContactData(element.label)}
                                                        onChange={(newValue) => {
                                                            setContactData(element.label, newValue)
                                                        }}
                                                        renderInput={(params) => <TextField {...params} sx={{ width: '300px', maxWidth: '80vw' }} size='small' />}
                                                    />
                                                </React.Fragment>
                                            )
                                        default:
                                            return (
                                                <TextField
                                                    key={element.label}
                                                    sx={{
                                                        width: '300px',
                                                        maxWidth: '80vw',
                                                    }}
                                                    label={element.label}
                                                    type={element.type}
                                                    size="small"
                                                    error={isError(element)}
                                                    onChange={e => setContactData(element.label, e.target.value)}
                                                    defaultValue={getContactData(element.label)}
                                                    helperText={generateHelperText(element)}
                                                />
                                            )
                                    }
                                })
                            }
                        </React.Fragment>
                    }
                    <Button sx={{ width: '300px', maxWidth: '80vw' }} variant="contained" onClick={callSave}>
                        Save
                    </Button>
                </Stack>
            </div>
        </LocalizationProvider>
    )
}

export default EditContact;