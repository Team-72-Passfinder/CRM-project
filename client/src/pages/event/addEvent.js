import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Box,
  Dialog,
  Slide,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  FilledInput,
  FormControl,
  Button,
  createTheme,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
} from '@mui/material';

import { makeStyles } from '@mui/styles';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs';
import DatePicker from '@mui/lab/DatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import StandardInput from '../../components/StandardInput';

import { addEvent, getContacts, getEvents } from '../../api';

const useStyles = makeStyles((theme) => ({
  addButton: {
    top: '-10px',
    right: '-400px',
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const defaultValues = {
  name: 'none',
  startedDateTime: new Date(),
  endedDateTime: new Date(),
  participants: [],
  description: 'none',
  completed: false,
};

function AddEvent() {
  const [event, setEvent] = useState(defaultValues);
  const [contacts, setContacts] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: value,
    });
  };

  function saveEvent() {
    addEvent(event).then((res) => {
      if (event.name === res.name) {
        handleClose();
        getEvents().then((res) => {
          setTimeout(() => {
            setEvent(res);
          }, 200);
        });
      }
    });
  }

  useEffect(() => {
    const inputs = document.querySelectorAll('input');

    Array.from(inputs).filter((input) => {
      if (input.required === true) {
        console.log(event);
        if (!input.validity.valid) {
          setSubmitDisabled(true);
        } else {
          setSubmitDisabled(false);
        }
      }
    });
  }, [event]);

  // Used to get data when the page loads;
  useEffect(() => {
    getContacts().then((res) => {
      setContacts(res);
    });
  }, []);

  const classes = useStyles();

  return (
    <div>
      <Button
        className={classes.addButton}
        color="primary"
        variant="contained"
        align="center"
        onClick={handleClickOpen}
      >
        Add New Event
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Event</DialogTitle>
        <DialogContent>
          <StandardInput
            label="Name"
            name="name"
            value={event.name}
            setValue={setEvent}
            required={true}
            type="text"
          />
          <StandardInput
            label="Description"
            name="description"
            value={event.description}
            setValue={setEvent}
            required={false}
            type="text"
          />

          <FormControl margin="dense" variant="filled">
            <InputLabel>Participants</InputLabel>
            <Select
              name="participants"
              multiple
              value={event.participants}
              onChange={handleInputChange}
              MenuProps={MenuProps}
            >
              {contacts.map((contact) => (
                <MenuItem key={String(contact._id)} value={String(contact._id)}>
                  {contact.firstName + ' ' + contact.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={DateAdapter}>
            <FormControl margin="dense" variant="filled">
              <Typography
                sx={{ fontSize: '15px', fontWeight: 600 }}
                margin="none"
              >
                start Date
              </Typography>
              <DateTimePicker
                name="startedDateTime"
                value={event.startedDateTime}
                onChange={handleInputChange}
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
                        },
                      }}
                      disableUnderline={true}
                      hiddenLabel={true}
                      endAdornment={InputProps?.endAdornment}
                      ref={inputRef}
                      {...inputProps}
                    />
                  </Box>
                )}
              />
            </FormControl>
            <FormControl margin="dense" variant="filled">
              <Typography
                sx={{ fontSize: '15px', fontWeight: 600 }}
                margin="none"
              >
                end Date
              </Typography>
              <DateTimePicker
                name="endedDateTime"
                value={event.endedDateTime}
                onChange={handleInputChange}
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
                        },
                      }}
                      disableUnderline={true}
                      hiddenLabel={true}
                      endAdornment={InputProps?.endAdornment}
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
          <Button
            sx={{
              width: 300,
              my: '10px',
              '&.MuiButton-disableElevation': {
                boxShadow: `(${submitDisabled} && 'none') || '4px 4px 20px 5px rgba(223, 120, 97, 0.25)'`,
              },
            }}
            color="primary"
            variant="contained"
            disableElevation
            disabled={submitDisabled}
            onClick={saveEvent}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddEvent;
