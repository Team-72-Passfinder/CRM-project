import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Container,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import { getEvents } from '../../api';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#fff1e1',
  },
  eventGrid: {
    maxwidth: 'md',
    background: '#fff1e1',
    padding: 40,
  },
  eventDescription: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: '2',
  },
}));

const maxCards = 10;
let cardIndex = Array.from(Array(maxCards).keys());

function Home() {
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

  if (events.length > 0) {
    // Prevent undefined entries
    if (events.length < maxCards)
      cardIndex = Array.from(Array(events.length).keys());

    return (
      <div className={classes.root}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Welcome Back (name)
          </Typography>
        </Container>

        <Grid container spacing={4} className={classes.eventGrid}>
          {cardIndex.map((i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {events[i].name}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="h2">
                    {getDate(events[i].startedDateTime)}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={classes.eventDescription}
                  >
                    {events[i].description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={'/event/' + events[i]._id}>
                    <Button variant="warning" size="lg">
                      View
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  } else {
    return <h3> Loading...</h3>;
  }
}
export default Home;
