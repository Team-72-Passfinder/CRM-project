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

import { delEvent, getEvents} from '../../api';

function DeleteEvent() {
    const [event, setEvent] = useState({})

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function deleteEvent() {
    delEvent(event).then(res => {

            handleClose();
            getEvents().then(res => {
                setEvent(res)
                setTimeout(() => {
                }, 200)
            })
        
    })
}



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
        Delete
      </Button>
      </ThemeProvider>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete this event?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button sx={{ width: 30, my: '10px' } } color="primary" variant="contained" onClick={deleteEvent}>
                    Delete
                </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}export default DeleteEvent
