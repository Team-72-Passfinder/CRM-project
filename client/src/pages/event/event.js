import React, { useState, useEffect } from 'react';
import { Button, Stack, Chip, Box, createTheme, FormControlLabel, Switch } from '@mui/material';
import { Typography } from '@mui/material';
import { makeStyles, ThemeProvider } from '@mui/styles';
import { Link } from 'react-router-dom';
import { EditText, EditTextarea } from 'react-edit-text';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import 'react-edit-text/dist/index.css';

import { getEvent, deleteEvent, getContact } from '../../api';
import Navbar from '../../components/Navbar';
// Remove when ready
import EventInvite from '../../components/EventInvite';
import DeleteEvent from './deleteEvent';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
      '/myevent/edit/' + event._id;
  };

  const goBack = () => {
    window.location.href = '/events/';
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
                display: 'flex', flexDirection: 'row', alignItems: 'center', ml: '100px', padding: '15px', backgroundColor: '#f7e0d2'
              }} >
                <Button
                  variant="contained"
                  sx={{ ml: '40px' }}
                  color="primary"
                  onClick={goBack}
                >
                  BACK
                </Button>
                <Box sx={{
                  display: 'flex', flexDirection: 'row', width: '80vw', alignItems: 'center', ml: '80px', backgroundColor: '#f7e0d2', justifyContent: 'space-between',
                }} >
                  <Typography sx={{ fontSize: { xs: '24px', sm: '24px' }, fontWeight: 700, color: '#272727' }}>
                    {getDate(Date())}
                  </Typography>

                </Box>
                <Box sx={{
                  display: 'flex', flexDirection: 'row', width: '20vw', alignItems: 'left', ml: '40px', backgroundColor: '#f7e0d2', justifyContent: 'space-between',
                }} >
                  <ThemeProvider theme={orangeTheme}>
                    <Stack spacing={3} direction="row">
                      <EventInvite eventId={event._id} />
                      <Button
                        className={classes.button} color="primary" variant="contained" onClick={goToEdit}>
                        Edit
                      </Button>
                      <DeleteEvent eventId={event._id} />
                    </Stack>
                  </ThemeProvider>
                </Box>
              </Box>

              <Box sx={{
                align: 'center', width: '40vw', height: '100%', mt: '80px', ml: '500px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between',
                borderRadius: 4, boxShadow: 2
              }}>
                <Box sx={{
                  display: 'flex', width: '38vw', alignItems: 'center', mb: '20px', backgroundColor: '#DF7861', padding: '20px', borderRadius: 4
                }} >
                  <Typography sx={{ fontSize: { xs: '30px', sm: '30px' }, fontWeight: 700, color: '#272727' }}>
                    {event.name}
                  </Typography>
                </Box>
                <Box sx={{
                  display: 'flex', width: '38vw', alignItems: 'center', mb: '20px', backgroundColor: '#f7e0d2', padding: '20px', borderRadius: 4
                }} >
                  <Typography sx={{ fontSize: { xs: '24px', sm: '24px' }, fontWeight: 500, color: '#272727' }}>
                    Starts at: {getDate(event.startedDateTime)}
                  </Typography>
                  <Typography sx={{ fontSize: { xs: '24px', sm: '24px' }, fontWeight: 500, color: '#272727' }}>
                    Ends at: {getDate(event.endedDateTime)}
                  </Typography>
                </Box>
                <Box sx={{
                  display: 'flex', alignItems: 'center', mb: '20px', backgroundColor: '', padding: '20px', borderRadius: 4
                }} >
                  <Typography sx={{ fontSize: { xs: '22px', sm: '22px' }, fontWeight: 450, color: '#272727' }}>
                    {event.description}
                  </Typography>
                </Box>
                <Box sx={{
                  display: 'flex', alignItems: 'center', mb: '20px', padding: '20px', borderRadius: 4
                }} >
                  <Typography sx={{ fontSize: { xs: '24px', sm: '24px' }, fontWeight: 500, color: '#272727' }}>
                    Participants:
                  </Typography>
                  <Stack sx={{ ml: '15px' }} direction="row" spacing={1}>
                    {event.participantNames.map((todo, index) => (
                      <Chip label={todo} clickable onClick={e => window.location.href = '/socials/' + event.participants[index]} />
                    ))}
                  </Stack>
                </Box>
                <Stack direction="row">
                  <Box sx={{
                    display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '', padding: '20px', borderRadius: 4
                  }} >
                    <Typography sx={{ fontSize: { xs: '24px', sm: '24px' }, fontWeight: 500, color: '#272727' }}>
                      Completed:
                    </Typography>
                  </Box>
                  <Box sx={{
                    display: 'flex', flexDirection: 'row', alignItems: 'left', backgroundColor: '', padding: '20px', borderRadius: 4
                  }} >
                    <FormControlLabel
                      margin="none"
                      label=""
                      control={<Switch checked={event.completed}
                        disabled
                        color="primary" />}
                    />
                  </Box>
                </Stack>

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
