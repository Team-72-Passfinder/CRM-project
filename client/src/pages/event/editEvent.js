import React, { useEffect, useState } from 'react';

import { Stack, TextField, Button } from '@mui/material';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs';
import DatePicker from '@mui/lab/DatePicker';

import Navbar from '../../components/Navbar';
import { getEvent, saveEvent } from '../../api';

const formList = [
  {
    label: 'Name',
    type: 'text',
    required: true,
  },
  {
    label: 'Date Time',
    type: 'date',
    required: true,
  },
  {
    label: 'Description',
    type: 'text',
  },
];

function EditEvent() {
  // const classes = useStyles()

  const [event, setEvent] = useState();

  const emptyFieldErrorMessage = 'This field is required';

  useEffect(() => {
    let id = window.location.pathname.split('/')[2];
    getEvent(id).then((res) => {
      setEvent(res);
    });
  }, []);

  function callSave() {
    // Temporary fix
    delete event.belongsTo;
    console.log(event);
    saveEvent(event);
  }

  function getEventData(key) {
    switch (key) {
      case 'Name':
        return event.name;
      case 'Date Time':
        return event.dateTime;
      case 'Description':
        return event.description;
      default:
        return null;
    }
  }

  function setEventData(key, value) {
    switch (key) {
      case 'Name':
        setEvent((prev) => ({ ...prev, name: value }));
        break;
      case 'Date Time':
        setEvent((prev) => ({ ...prev, dateTime: value }));
        break;
      case 'Description':
        setEvent((prev) => ({ ...prev, description: value }));
        break;
      default:
        break;
    }
  }

  function generateHelperText(element) {
    if (element.required) {
      return getEventData(element.label) === '' && emptyFieldErrorMessage;
    }

    if (getEventData(element.label) !== '') {
      switch (element.type) {
        default:
      }
    }
  }

  function isError(element) {
    if (element.required) {
      return getEventData(element.label) === '';
    }

    if (getEventData(element.label) !== '') {
      switch (element.type) {
        default:
      }
    }
  }

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <div>
        <Navbar />
        <Stack
          sx={{ my: 2 }}
          alignItems="center"
          spacing={2}
          // sx={{ background: 'red' }}
        >
          {event && (
            <React.Fragment>
              {event !== undefined &&
                formList.map((element) => {
                  switch (element.type) {
                    case 'date':
                      return (
                        <React.Fragment key={element.label}>
                          <DatePicker
                            disableFuture
                            label={element.label}
                            value={getEventData(element.label)}
                            onChange={(newValue) => {
                              setEventData(element.label, newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                sx={{ width: '300px', maxWidth: '80vw' }}
                                size="small"
                              />
                            )}
                          />
                        </React.Fragment>
                      );
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
                          onChange={(e) =>
                            setEventData(element.label, e.target.value)
                          }
                          defaultValue={getEventData(element.label)}
                          helperText={generateHelperText(element)}
                        />
                      );
                  }
                })}
            </React.Fragment>
          )}
          <Button
            sx={{ width: '300px', maxWidth: '80vw' }}
            variant="contained"
            onClick={callSave}
          >
            Save
          </Button>
        </Stack>
      </div>
    </LocalizationProvider>
  );
}

export default EditEvent;
