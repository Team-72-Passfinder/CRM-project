import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Dialog, Slide, IconButton, AppBar, Toolbar, Typography, FilledInput, FormControl, Button, createTheme, ThemeProvider } from '@mui/material'

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs'
import DatePicker from '@mui/lab/DatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import StandardInput from '../../components/StandardInput';
import AutoComplete from '../../components/AutoComplete';

import { addEvent } from '../../api';

function NewEvent({ open, setOpen, setEvents, progressing }) {
  const [event, setEvent] = useState({
    name: '',
    description: '',
    startedDateTime: new Date(),
    endedDateTime: new Date(),
    completed: false, // By default
    participants: [],
  })
  const [submitDisabled, setSubmitDisabled] = useState(true)
  //const [alert, setAlert] = useState();
  //const [user, setUser] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function saveEvent() {
    addEvent(event);
    window.location.href = '/myevent/' + event._id;
  }

  useEffect(() => {
    const inputs = document.querySelectorAll('input')

    Array.from(inputs).filter(input => {
      if (input.required === true) {
        console.log(event)
        if (!input.validity.valid) {
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
        <Button color="primary" sx={{ width: 180, height: 40, my: '10px', fontSize: '16px' }}
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
                Started Date
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
          <LocalizationProvider dateAdapter={DateAdapter}>
            <FormControl margin="dense" variant="filled">
              <Typography sx={{ fontSize: '15px', fontWeight: 600 }} margin="none">
                Ended Date
              </Typography>
              <DateTimePicker
                id="endedDateTime"
                value={event.endedDateTime}
                onChange={(newValue) => {
                  setEvent(prev => ({ ...prev, endedDateTime: newValue }))
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
          <AutoComplete id="participants" label="Participants" name="participants" value={event.participants} setValue={setEvent} />
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

export default NewEvent