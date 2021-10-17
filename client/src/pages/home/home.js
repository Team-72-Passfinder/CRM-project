import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Container,
  CardHeader,
  Stack,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import Navbar from '../../components/Navbar';
import { getEvents, me } from '../../api';
import logo from './citrus-contact-logo.png';
import { Box } from '@mui/system';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#fff1e1',
    minHeight: '100vh',
    paddingBottom: 20,
  },
  eventGrid: {
    maxwidth: 'md',
    paddingLeft: 30,
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
  overallCard: {},
}));

const maxCards = 6;
let cardIndex = Array.from(Array(maxCards).keys());

function Home() {
  const classes = useStyles();

  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getEvents().then((res) => {
      setEvents(res);
    });
    me().then((res) => {
      setUserData(res);
    });
  }, [events]);

  const getDate = (date) => {
    var jsDate = new Date(date);
    return jsDate.toLocaleString('en-GB', { timeZone: 'UTC' });
  };

  function handleClick(id) {
    window.location.href = '/myevent/' + id;
  }

  // Only displayed maximum number of events on home eo we use cardIndex
  let cardIndex = Array.from(Array(maxCards).keys());
  // Prevent undefined entries
  if (events.length < maxCards)
    cardIndex = Array.from(Array(events.length).keys());

  return (
    <Box className={classes.root}>
      <Navbar active="Home" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingLeft: '20vw',
          paddingRight: '20vw',
        }}
      >
        {/* Hero Unit */}
        <img src={logo} alt="Logo" width="120px" style={{ padding: 10 }} />

        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="black"
            gutterBottom
            style={{ fontWeight: 600 }}
          >
            Welcome Back {userData.username}
          </Typography>
        </Container>
        {/* End Hero Unit */}

        {/* Event Grid Unit */}
        <Grid container spacing={4} className={classes.eventGrid}>
          {cardIndex.map((i) => (
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
                  <Typography variant="body2" className={classes.overflowText}>
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
export default Home;
