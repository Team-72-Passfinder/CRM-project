import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import Navbar from '../../components/Navbar';
import { getEvents } from '../../api';
import { Box } from '@mui/system';

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

  useEffect(() => {
    getEvents().then((res) => {
      setEvents(res);
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
          display="flex"
          flexDirection="column"
          size="lg"
          justifyContent="center"
          className={classes.headerBox}
        >
          <Typography
            component="h1"
            variant="h2"
            color="black"
            gutterBottom
            style={{ fontWeight: 600 }}
          >
            My Events: {events.length}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ margin: 2 }}
          >
            <AddEvent />
          </Box>
        </Box>

        {/* End Hero Unit */}

        {/* Event Grid Unit */}
        {/* Upcoming Events */}
        <Typography component="h3" variant="h3" align="center" color="black">
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
                    <Typography variant="h6" className={classes.overflowText}>
                      {events[i].name}
                    </Typography>
                  }
                ></CardHeader>
                <CardContent>
                  <Typography gutterBottom variant="body2">
                    Datetime: {getDate(events[i].startedDateTime)}
                  </Typography>
                  <Typography variant="body2">
                    Number of Participants: {events[i].participants.length}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={classes.eventDescription}
                  >
                    Description: {events[i].description}
                  </Typography>
                </CardContent>
                <CardActions>
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
        <Typography component="h3" variant="h3" align="center" color="black">
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
                    <Typography variant="h6" className={classes.overflowText}>
                      {events[i].name}
                    </Typography>
                  }
                ></CardHeader>
                <CardContent>
                  <Typography gutterBottom variant="body2">
                    {getDate(events[i].startedDateTime)}
                  </Typography>

                  <Typography variant="body2">
                    Number of Participants: {events[i].participants.length}
                  </Typography>
                  <Typography variant="body2" className={classes.overflowText}>
                    Description: {events[i].description}
                  </Typography>
                </CardContent>
                <CardActions>
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

        {/* End Event Grid Unit */}
      </Box>
    </Box>
  );
}
export default EventList;
