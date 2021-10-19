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
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import Navbar from '../../components/Navbar';
import { getEvents, me } from '../../api';
import logo from './citrus-contact-logo.png';

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

function Home() {
  const classes = useStyles();

  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getEvents().then((res) => {
      setEvents(res);
      setLoading(false);
    });
    me().then((res) => {
      setUserData(res);
    });
  }, []);

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

  const EventGridUnit = () => {
    if (isLoading) {
      return <Typography>Loading...</Typography>;
    } else {
      return (
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
                    <Typography sx={{ fontSize: '24px', fontWeight: 500, color: 'black', }} className={classes.overflowText}>
                      {events[i].name}
                    </Typography>
                  }
                ></CardHeader>
                <CardContent>
                  <Typography gutterBottom sx={{ fontSize: '20px', fontWeight: 450, color: 'black' }}>
                    Datetime: {getDate(events[i].startedDateTime)}
                  </Typography>
                  <Typography sx={{ fontSize: '16px', fontWeight: 430, color: 'black' }}>
                    Number of Participants: {events[i].participants.length}
                  </Typography>
                  <Typography sx={{ fontSize: '15px', fontWeight: 400, color: 'black' }} className={classes.overflowText}>
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
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      );
    }
  };

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
          mt: '8px',
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
        {EventGridUnit()}
        {/* End Event Grid Unit */}
      </Box>
    </Box>
  );
}
export default Home;
