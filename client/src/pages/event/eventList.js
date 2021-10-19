import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  Box,
  Container,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import Navbar from '../../components/Navbar';
import { getEvents } from '../../api';

import AddEvent from './addEvent';
import DeleteEvent from './deleteEvent';
import EventInvite from '../../components/EventInvite';

const useStyles = makeStyles((theme) => ({
  root: {
    background: ' #fff1e1',
    paddingBottom: 20,
    minHeight: '100vh',
  },
  eventGrid: {
    maxwidth: 'md',
    padding: 40,
  },
  eventName: {
    backgroundColor: '#DF7861',
  },
  overflowText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: '2',
  },
  headerBox: {
    justifyContent: 'center',
  },
}));

const maxCards = 30;
let cardIndex = Array.from(Array(maxCards).keys());

function EventList() {
  const classes = useStyles();

  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getEvents().then((res) => {
      setEvents(res);
      setLoading(false);
    });
  }, []);

  const getDate = (date) => {
    var jsDate = new Date(date);
    return jsDate.toLocaleString('en-GB', { timeZone: 'UTC' });
  };

  function handleClick(id) {
    window.location.href = '/myevent/' + id;
  }

  // Prevent undefined entries
  if (events.length < maxCards)
    cardIndex = Array.from(Array(events.length).keys());
  // Grouping events and sort them
  var upcomingEvents = cardIndex.filter(function (e) {
    return new Date(events[e].startedDateTime) > new Date(Date.now());
  });
  // Display nearest upcoming event first
  upcomingEvents
    .sort((a, b) => {
      return events[a].startedDateTime > events[b].startedDateTime ? -1 : 1;
    })
    .reverse();
  var pastEvents = cardIndex.filter(function (e) {
    return new Date(events[e].startedDateTime) < new Date(Date.now());
  });
  // Display nearest past event first
  pastEvents
    .sort((a, b) => {
      return events[a].startedDateTime > events[b].startedDateTime ? 1 : -1;
    })
    .reverse();

  /* Conditional render the event grid */
  const EventGridUnit = () => {
    if (isLoading) {
      return <Typography>Loading...</Typography>;
    } else {
      return (
        <Container>
          {/* Upcoming Events */}
          <Typography
            align="center"
            sx={{
              fontSize: '40px',
              mt: '20px',
              fontWeight: 650,
              color: '#272727',
            }}
          >
            Upcoming Events: {upcomingEvents.length}
          </Typography>
          <Grid container spacing={4} className={classes.eventGrid}>
            {upcomingEvents.map((i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card
                  elevation={3}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <CardHeader
                    className={classes.eventName}
                    title={
                      <Typography
                        sx={{
                          fontSize: '24px',
                          fontWeight: 500,
                          color: 'black',
                        }}
                        className={classes.overflowText}
                      >
                        {events[i].name}
                      </Typography>
                    }
                  ></CardHeader>
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{ fontSize: '20px', fontWeight: 450, color: 'black' }}
                    >
                      Datetime: {getDate(events[i].startedDateTime)}
                    </Typography>
                    <Typography
                      sx={{ fontSize: '16px', fontWeight: 430, color: 'black' }}
                    >
                      Number of Participants: {events[i].participants.length}
                    </Typography>
                    <Typography
                      sx={{ fontSize: '15px', fontWeight: 400, color: 'black' }}
                      className={classes.eventDescription}
                    >
                      Description: {events[i].description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ ml: '10px', mb: '10px' }}>
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => handleClick(events[i]._id)}
                      >
                        View
                      </Button>
                    </div>
                    <DeleteEvent eventId={events[i]._id} />
                    <EventInvite eventId={events[i]._id} />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          {/* Past Events */}
          <Typography
            align="center"
            sx={{
              fontSize: '40px',
              mt: '20px',
              fontWeight: 650,
              color: '#272727',
            }}
          >
            Past Events: {pastEvents.length}
          </Typography>
          <Grid container spacing={4} className={classes.eventGrid}>
            {pastEvents.map((i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card
                  elevation={3}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: '#f0f0f0',
                  }}
                >
                  <CardHeader
                    className={classes.eventName}
                    title={
                      <Typography
                        sx={{
                          fontSize: '24px',
                          fontWeight: 500,
                          color: 'black',
                        }}
                        className={classes.overflowText}
                      >
                        {events[i].name}
                      </Typography>
                    }
                  ></CardHeader>
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{ fontSize: '20px', fontWeight: 450, color: 'black' }}
                    >
                      {getDate(events[i].startedDateTime)}
                    </Typography>

                    <Typography
                      sx={{ fontSize: '16px', fontWeight: 430, color: 'black' }}
                    >
                      Number of Participants: {events[i].participants.length}
                    </Typography>
                    <Typography
                      sx={{ fontSize: '15px', fontWeight: 400, color: 'black' }}
                      className={classes.overflowText}
                    >
                      Description: {events[i].description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ ml: '10px', mb: '10px' }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={(e) => handleClick(events[i]._id)}
                      >
                        View
                      </Button>
                    </div>
                    <DeleteEvent eventId={events[i]._id} />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      );
    }
  };

  return (
    <Box className={classes.root}>
      <Navbar active="Events" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingLeft: '10vw',
          paddingRight: '10vw',
        }}
      >
        {/* Hero Unit */}

        <Box
          sx={{ mt: '15px' }}
          display="flex"
          flexDirection="column"
          size="lg"
          justifyContent="center"
          className={classes.headerBox}
        >
          <Typography
            sx={{ fontSize: '50px', fontWeight: 700, color: '#272727' }}
          >
            My Events: {events.length}
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="center">
            <AddEvent />
          </Box>
        </Box>

        {/* End Hero Unit */}

        {/* Event Grid Unit */}
        {EventGridUnit()}
        {/* End Event Grid Unit */}
      </Box>
    </Box>
  );
}
export default EventList;
