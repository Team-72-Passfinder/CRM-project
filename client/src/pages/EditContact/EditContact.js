import React, { useEffect, useState } from 'react'

import {
    Box,
    Avatar,
    Typography,
    Fab,
    makeStyles,
    Input,
    InputLabel,
    InputBase,
    IconButton,
    Button,
    TextField,
} from '@material-ui/core'

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import Navbar from '../../components/Navbar/Navbar';
import { getContact, save } from '../../api';

const useStyles = makeStyles((theme) => ({
    photo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        // width: '100vw'
    },
    avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
    }
}))

function EditContact() {
    const classes = useStyles()

    const [contact, setContact] = useState({ firstName: 'none', lastName: 'none', email: 'none', phoneNumber: 'none' })
    const [update, setUpdate] = useState();

    const emptyFieldErrorMessage = 'This field is required'

    useEffect(() => {
        // console.log(window.location.pathname.split('/')[3])
        getContact(window.location.pathname.split('/')[3]).then(res => setContact(res))
    })

    function callSave() {
        console.log(update);
        save(update, contact._id)
    }

    return (
        <div>
            <Navbar />
            <Box className={classes.photo} mt={5}>
                <input
                    id='img'
                    accept="image/*"
                    type='file'
                    style={{display:'none'}}
                    // onChange={e => {
                    //     setUpdate({ avatar: e.target.files[0]})
                    //     // console.log(contact)
                    // }}
                />
                <label htmlFor='img'>
                    {contact !== null || contact.avatar === ""?
                        (
                            <Avatar className={classes.avatar}>
                                <AddAPhotoIcon />
                            </Avatar>
                        )
                        :
                        (
                            <Avatar className={classes.avatar} src={contact.avatar} />
                        )
                    }
                </label>
            </Box>
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
                        error={((contact.email !== '' && contact.email !== 'none')&& !/\S+@\S+\.\S+/.test(contact.email))}
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
                    {/* <Button className={classes.submitButton} variant="contained" color="primary" fullWidth onClick={saveContact} disabled={submitDisabled}>
                        Save
                    </Button> */}
            </form>
            {/* <Button onClick={callSave}>
                Save
            </Button> */}
        </div>
    )
}

export default EditContact;