import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Box,
  Dialog,
  Typography,
  FilledInput,
  FormControl,
  Button,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Stack,
} from '@mui/material';

import { makeStyles } from '@mui/styles';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs';
import DateTimePicker from '@mui/lab/DateTimePicker';
import StandardInput from '../../components/StandardInput';

import { addEvent, getContacts } from '../../api';

const useStyles = makeStyles((theme) => ({}));

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
  name: '',
  startedDateTime: new Date(),
  endedDateTime: new Date(),
  participants: [],
  description: '',
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

  const handleParticipantsChange = (e) => {
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
        window.location.reload();
      }
    });
  }

  useEffect(() => {
    const inputs = document.querySelectorAll('input');

    Array.from(inputs).filter((input) => {
      if (input.required === true) {
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
      <Button sx={{ width: 180, height: 40, my: '10px', fontSize: '16px' }}
        color="primary"
        variant="contained"
        align="center"
        onClick={handleClickOpen}
      >
        Add New Event
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <DialogTitle sx={{ fontSize: '24px', fontWeight: 600, color: '#272727' }}>New Event</DialogTitle>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
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

          <Box>
            <FormControl
              margin="dense"
              variant="filled"
              sx={{ m: 1, width: 300 }}
            >
              <Typography
                sx={{ fontSize: '15px', fontWeight: 600 }}
                margin="none"
              >
                Participants
              </Typography>
              <Select
                name="participants"
                multiple
                value={event.participants}
                onChange={handleParticipantsChange}
                MenuProps={MenuProps}
              >
                {contacts.map((contact) => (
                  <MenuItem
                    key={String(contact._id)}
                    value={String(contact._id)}
                  >
                    {contact.firstName + ' ' + contact.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <LocalizationProvider dateAdapter={DateAdapter}>
            <FormControl margin="dense" variant="filled">
              <Typography
                sx={{ fontSize: '15px', fontWeight: 600 }}
                margin="none"
              >
                Start Date
              </Typography>
              <DateTimePicker
                name="startedDateTime"
                value={event.startedDateTime}
                onChange={(newValue) => {
                  setEvent((prev) => ({ ...prev, startedDateTime: newValue }));
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
                End Date
              </Typography>
              <DateTimePicker
                name="endedDateTime"
                value={event.endedDateTime}
                onChange={(newValue) => {
                  setEvent((prev) => ({ ...prev, endedDateTime: newValue }));
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
              <Stack spacing={21} direction="row">
                <Typography
                  sx={{ fontSize: '15px', fontWeight: 600 }}
                  margin="none"
                >
                  Completed
                </Typography>
                <FormControlLabel
                  margin="none"
                  label=""
                  control={<Switch checked={event.completed}
                    onChange={e => { setEvent((prev) => ({ ...prev, completed: e.target.checked })) }}
                    color="primary" />}
                />
              </Stack>
            </FormControl>
          </LocalizationProvider>
        </Box>
        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button sx={{ width: 200 }} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            sx={{
              width: 200,
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
    </div >
  );
}

export default AddEvent;
