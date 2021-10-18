import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControlLabel,
  Typography,
  Stack,
  Select,
  FilledInput,
  MenuItem,
  Button,
  createTheme,
  TextField,
  Switch,
} from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { makeStyles } from '@mui/styles';

import Navbar from '../../components/Navbar';
import { getEvent, updateEvent, getContacts } from '../../api';

const formList = [
  {
    label: 'Name',
    type: 'text',
    required: true,
  },
  {
    label: 'Description',
    type: 'para',
  },
  {
    label: 'Start Date',
    type: 'date',
  },
  {
    label: 'End Date',
    type: 'date',
  },
  {
    label: 'Participants',
    type: 'list',
  },
  {
    label: 'Completed',
    type: 'checked',
  },
];

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

const useStyles = makeStyles((theme) => ({}));

function EditEvent() {
  const classes = useStyles();
  const [event, setEvent] = useState();
  const [contacts, setContacts] = useState([]);

  const emptyFieldErrorMessage = 'This field is required';

  useEffect(() => {
    getEvent(window.location.pathname.split('/')[3]).then((res) =>
      setEvent(res)
    );
  }, []);

  // Used to get data when the page loads;
  useEffect(() => {
    getContacts().then((res) => {
      setContacts(res);
    });
  }, []);

  const handleParticipantsChange = (e) => {
    const { name, value } = e.target;
    setEventData('Participants', value);
  };

  function getEventData(key) {
    switch (key) {
      case 'Name':
        return event.name;
      case 'Start Date':
        return new Date(event.startedDateTime);
      case 'End Date':
        return new Date(event.endedDateTime);
      case 'Description':
        return event.description;
      case 'Participants':
        return event.participants;
      case 'Completed':
        return event.completed;
      default:
        return null;
    }
  }

  function setEventData(key, value) {
    switch (key) {
      case 'Name':
        setEvent((prev) => ({ ...prev, name: value }));
        break;
      case 'Start Date':
        setEvent((prev) => ({ ...prev, startedDateTime: value }));
        break;
      case 'End Date':
        setEvent((prev) => ({ ...prev, endedDateTime: value }));
        break;
      case 'Description':
        setEvent((prev) => ({ ...prev, description: value }));
        break;
      case 'Participants':
        setEvent((prev) => ({ ...prev, participants: value }));
        break;
      case 'Completed':
        setEvent((prev) => ({ ...prev, completed: value }));
        break;
      default:
        return null;
    }
  }

  function generateHelperText(element) {
    if (element.required) {
      return getEventData(element.label) === '' && emptyFieldErrorMessage;
    }
  }

  function saveEvent() {
    updateEvent(event).then((res) => {
      // This is for debugging
      if (res) {
        window.location.href = '/myevent/' + event._id;
      }
    });
    //window.location.href = '/myevent/' + event._id;
  }

  function isError(element) {
    if (element.required) {
      return getEventData(element.label) === '';
    }
  }

  const getDate = (date) => {
    var jsDate = new Date(date);
    return jsDate.toLocaleString('en-GB', { timeZone: 'UTC' });
  };

  const cancel = () => {
    window.location.href = '/myevent/' + event._id;
  };

  const orangeTheme = createTheme({
    palette: {
      primary: {
        main: '#DF7861',
      },
    },
  });

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <div>
        <Navbar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            ml: '100px',
            padding: '20px',
            backgroundColor: '#f7e0d2',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '80vw',
              alignItems: 'center',
              ml: '80px',
              backgroundColor: '#f7e0d2',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h5">{getDate(Date())}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '20vw',
              alignItems: 'left',
              ml: '40px',
              backgroundColor: '#f7e0d2',
              justifyContent: 'space-between',
            }}
          >
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              onClick={cancel}
            >
              Cancel
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            align: 'center',
            width: '40vw',
            height: '100%',
            mt: '80px',
            ml: '500px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            justifyContent: 'space-between',
            borderRadius: 4,
            boxShadow: 2,
          }}
        >
          <Stack sx={{ my: 2 }} alignItems="center" spacing={2}>
            {event && (
              <React.Fragment>
                {event !== undefined &&
                  formList.map((element) => {
                    switch (element.type) {
                      //Case of displaying date
                      case 'date':
                        return (
                          <Stack spacing={1}>
                            <Typography
                              sx={{ fontSize: '15px', fontWeight: 600 }}
                              margin="none"
                            >
                              {element.label}
                            </Typography>
                            <DateTimePicker
                              label={element.label}
                              value={getEventData(element.label)}
                              onChange={(newValue) => {
                                setEventData(element.label, newValue);
                              }}
                              renderInput={({
                                inputRef,
                                inputProps,
                                InputProps,
                              }) => (
                                <Box
                                  sx={{ display: 'flex', alignItems: 'center' }}
                                >
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
                          </Stack>
                        );
                      // Case of participants displaying
                      case 'list':
                        return (
                          <Stack spacing={1} sx={{ width: 300 }}>
                            <Typography
                              sx={{ fontSize: '15px', fontWeight: 600 }}
                              margin="none"
                            >
                              {element.label}
                            </Typography>
                            <Select
                              multiple
                              value={getEventData(element.label)}
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
                          </Stack>
                        );
                      // Case of description text paragraph
                      case 'para':
                        return (
                          <Stack spacing={1} sx={{ width: 300 }}>
                            <Typography
                              sx={{ fontSize: '15px', fontWeight: 600 }}
                              margin="none"
                            >
                              {element.label}
                            </Typography>
                            <TextField
                              key={element.label}
                              sx={{
                                width: '300px',
                              }}
                              multiline
                              type={element.type}
                              size="small"
                              onChange={(e) =>
                                setEventData(element.label, e.target.value)
                              }
                              defaultValue={getEventData(element.label)}
                            />
                          </Stack>
                        );

                      // Case of switch
                      case 'checked':
                        return (
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
                              control={
                                <Switch
                                  checked={getEventData(element.label)}
                                  onChange={(e) => {
                                    setEventData(
                                      element.label,
                                      e.target.checked
                                    );
                                  }}
                                  color="primary"
                                />
                              }
                            />
                          </Stack>
                        );
                      // Normal text box
                      default:
                        return (
                          <Stack spacing={1} sx={{ width: 300 }}>
                            <Typography
                              sx={{ fontSize: '15px', fontWeight: 600 }}
                              margin="none"
                            >
                              {element.label}
                            </Typography>
                            <TextField
                              key={element.label}
                              sx={{
                                width: '300px',
                                maxWidth: '80vw',
                              }}
                              type={element.type}
                              size="small"
                              error={isError(element)}
                              onChange={(e) =>
                                setEventData(element.label, e.target.value)
                              }
                              defaultValue={getEventData(element.label)}
                              helperText={generateHelperText(element)}
                            />
                          </Stack>
                        );
                    }
                  })}
              </React.Fragment>
            )}
            <Button
              sx={{ width: '280px', maxWidth: '80vw' }}
              variant="contained"
              onClick={saveEvent}
            >
              Save
            </Button>
          </Stack>
        </Box>
      </div>
    </LocalizationProvider>
  );
}

export default EditEvent;
