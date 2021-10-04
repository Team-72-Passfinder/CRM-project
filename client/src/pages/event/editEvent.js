import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Dialog, Slide, IconButton, AppBar, Toolbar, Typography, Avatar, FilledInput, FormControl, Button,  createTheme,ThemeProvider } from '@mui/material'

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs'
import DatePicker from '@mui/lab/DatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import StandardInput from '../../components/StandardInput';

import { addEvent, getEvents} from '../../api';

function EditEvent() {
    const [event, setEvent] = useState({ name: 'none', description: 'none', startedDateTime: new Date(), belongsTo: '6128d8da5abef9dd792d90ff', completed: false})
    const [submitDisabled, setSubmitDisabled] = useState(true)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function saveEvent() {
    addEvent(event).then(res => {
        if(event.name === res.name ) {

            handleClose();
            getEvents().then(res => {
                setTimeout(() => {
                    setEvent(res)
                }, 200)
            })
        }
    })
}

useEffect(() => {
    const inputs = document.querySelectorAll('input')
    
    Array.from(inputs).filter(input => {
        if(input.required === true) {
            console.log(event)
            if(!input.validity.valid) {
                setSubmitDisabled(true)
            } else {
                setSubmitDisabled(false)
            }
        }
    })
}, [event])

const orangeTheme = createTheme({
    palette: {
      primary: {
        main: '#DF7861',
      },
    },
  });


  return (
    <div>
         <ThemeProvider theme={orangeTheme}>
      <Button color="primary"
                variant="contained" onClick={handleClickOpen}>
        Add New Event
      </Button>
      </ThemeProvider>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Event</DialogTitle>
        <DialogContent>
            <StandardInput id="name" label='Name' name='name' value={event.name} setValue={setEvent} required={true} type='text' />
            <StandardInput id="description" label='Description' name='description' value={event.description} setValue={setEvent} required={false} type='text' />
            <LocalizationProvider dateAdapter={DateAdapter}>
                    <FormControl margin="dense" variant="filled">
                        <Typography sx={{ fontSize: '15px', fontWeight: 600 }} margin="none">
                            Date
                        </Typography>
                        <DateTimePicker
                            id="startedDateTime"
                            value={event.startedDateTime}
                            onChange={(newValue) => {
                                setEvent(prev => ({ ...prev, startedDateTime: newValue }))
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button sx={{ width: 300, my: '10px', '&.MuiButton-disableElevation': { boxShadow: `(${submitDisabled} && 'none') || '4px 4px 20px 5px rgba(223, 120, 97, 0.25)'` } }} color="primary" variant="contained" disableElevation disabled={submitDisabled} onClick={saveEvent}>
                    Save
                </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditEvent