import React, { useEffect, useState } from 'react'

import { Box, Dialog, Slide, IconButton, AppBar, Toolbar, Typography, Avatar, FilledInput, FormControl, Button } from '@mui/material'

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs'
import DatePicker from '@mui/lab/DatePicker';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import StandardInput from '../../components/StandardInput';

import { addContact } from '../../api';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AddContact({ open, setOpen }) {
    const [contact, setContact] = useState({ firstName: 'none', lastName: 'none', email: '', phoneNumber: '', dateOfBirth: new Date(), belongsTo: '6128d8da5abef9dd792d90ff' })

    const handleClose = () => {
        setOpen(false);
    };

    function saveContact() {
        addContact(contact)
    }

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
                <StandardInput label='First name' name='firstName' value={contact.firstName} setValue={setContact} required={true} type='text' />
                <StandardInput label='Last name' name='lastName' value={contact.lastName} setValue={setContact} required={true} type='text' />
                <StandardInput label='Email' name='email' value={contact.email} setValue={setContact} reqeuired={false} type='email' />
                <StandardInput label='Phone number' name='phoneNumber' value={contact.phoneNumber} setValue={setContact} reqeuired={false} type='tel' />
                <LocalizationProvider dateAdapter={DateAdapter}>
                    <FormControl margin="dense" variant="filled">
                        <Typography sx={{ fontSize: '15px', fontWeight: 600 }} margin="none">
                            Date of birth
                        </Typography>
                        <DatePicker
                            value={contact.dateOfBirth}
                            disableFuture
                            onChange={(newValue) => {
                                setContact(prev => ({ ...prev, dateOfBirth: newValue }))
                            }}
                            renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <FilledInput
                                        // type="date"
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
                <Button sx={{ width: 300, my: '10px', '&.MuiButton-disableElevation': { boxShadow: '4px 4px 20px 5px rgba(223, 120, 97, 0.25)' } }} color="primary" variant="contained" disableElevation onClick={saveContact}>
                    Save
                </Button>
            </Box>
        </Dialog>
    )
}

export default AddContact