import React, { useState, useEffect } from 'react';
import { Button, Stack, Chip, Box, createTheme } from '@mui/material';
import { Typography } from '@mui/material';
import { makeStyles, ThemeProvider } from '@mui/styles';
import { Link } from 'react-router-dom';
import { EditText, EditTextarea } from 'react-edit-text';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import 'react-edit-text/dist/index.css';

import { getEvent, deleteEvent, editEvent } from '../../api';
import Navbar from '../../components/Navbar';
// Remove when ready
import EventInvite from '../../components/EventInvite';

const useStyles = makeStyles((theme) => ({}));

function Event() {
  const classes = useStyles();
  const [event, setEvent] = useState();

  useEffect(() => {
    let id = window.location.pathname.split('/')[2];
    getEvent(id).then((res) => {
      setEvent(res);
    });
  }, []);

  const getDate = (date) => {
    var jsDate = new Date(date);
    return jsDate.toLocaleString('en-GB', { timeZone: 'UTC' });
  };

  const goToEdit = () => {
    window.location.href =
      '/event/' + window.location.pathname.split('/')[2] + '/edit';
  };

  const orangeTheme = createTheme({
    palette: {
      primary: {
        main: '#DF7861',
      },
    },
  });

  const handleDelete = () => {
    deleteEvent(event._id);
    window.location.href = '/home/'
  }

  const maxCards = 10;
  let eventParticipants = Array.from(Array(maxCards).keys());
  if (event != null) {
    eventParticipants = Array.from(Array(event.participants.length).keys());
    return (
      <Box className={classes.root} sx={{
        backgroundColor: 'grey'
      }} >
        {
          <React.Fragment>
            <main>

              <Navbar />
              <Box sx={{
                display: 'flex', flexDirection: 'row', alignItems: 'center', ml: '100px', padding: '20px', backgroundColor: '#f7e0d2'
              }} >

                <Box sx={{
                  display: 'flex', flexDirection: 'row', width: '80vw', alignItems: 'center', ml: '80px', backgroundColor: '#f7e0d2', justifyContent: 'space-between',
                }} >
                  <Typography variant="h5">
                    {getDate(Date())}
                  </Typography>
                </Box>
                <Box sx={{
                  display: 'flex', flexDirection: 'row', width: '20vw', alignItems: 'left', ml: '40px', backgroundColor: '#f7e0d2', justifyContent: 'space-between',
                }} >
                  <ThemeProvider theme={orangeTheme}>
                    <Stack spacing={3} direction="row">
                      <Button
                        className={classes.button} color="primary" variant="contained" onClick={goToEdit}>
                        Edit
                      </Button>
                      <PopupState variant="popover" popupId="demo-popup-popover">
                        {(popupState) => (
                          <div>
                            <Button
                              color="primary"
                              variant="contained"
                              aria-label="delete"
                              size="large"
                              {...bindTrigger(popupState)} >
                              Delete
                            </Button>
                            <Popover
                              {...bindPopover(popupState)}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                              }}
                            >
                              <Typography sx={{ p: 2 }}>Are you sure to delete this event?</Typography>
                              <Button variant="contained" sx={{ left: '195px', bottom: '10px' }} onClick={handleDelete}>
                                Yes
                              </Button>
                            </Popover>
                          </div>
                        )}
                      </PopupState>
                    </Stack>
                  </ThemeProvider>
                </Box>
              </Box>

              <Box sx={{
                align: 'center', width: '40vw', height: '100%', mt: '80px', ml: '500px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'space-between',
                borderRadius: 4, boxShadow: 2
              }}>
                <Box sx={{
                  display: 'flex', alignItems: 'center', mb: '20px', backgroundColor: '#DF7861', padding: '20px', borderRadius: 4
                }} >
                  <Typography variant="h3">{event.name}</Typography>
                </Box>
                <Box sx={{
                  display: 'flex', alignItems: 'center', mb: '20px', backgroundColor: '#f7e0d2', padding: '20px', borderRadius: 4
                }} >
                  <Typography variant="h5">
                    Starts at: {getDate(event.startedDateTime)}
                  </Typography>
                  <Typography variant="h5">
                    Ends at: {getDate(event.endedDateTime)}
                  </Typography>
                </Box>
                <Box sx={{
                  display: 'flex', alignItems: 'center', mb: '20px', backgroundColor: '', padding: '20px', borderRadius: 4
                }} >
                  <Typography variant="h6">{event.description}</Typography>
                </Box>
                <Box sx={{
                  display: 'flex', alignItems: 'center', mb: '20px', padding: '20px', borderRadius: 4
                }} >
                  <Typography variant="h5"> Participants:</Typography>
                  <Stack sx={{ ml: '15px' }} direction="row" spacing={1}>
                    {event.participants.map((i) => (
                      <Chip label={i} /*href={/*Contact link goes here} clickable*/ />
                    ))}
                  </Stack>
                </Box>

              </Box>
            </main>
          </React.Fragment>
        }
      </Box>
    );
  } else {
    return <h3> Loading...</h3>;
  }
}
export default Event;
