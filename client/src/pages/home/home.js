import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PermanentDrawerLeft from './permanentDrawerLeft';
import { Link } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';

import { getEvents } from '../../api';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#fff1e1',
  },
  card: {
    height: '100%',
    width: '100%',
    display: 'flex',

    flexDirection: 'column',
    background: 'blue',
  },

  cardContent: {
    flexGrow: 1,
    background: 'blue',
  },
  cardGrid: {
    maxwidth: 'md',
    background: '#fff1e1',
  },
  cardItem: {
    height: '100%',
  },
}));

const maxCards = 10;
const cards = Array.from(Array(maxCards).keys());

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
    return (
      <div className={classes.root}>
        <Navbar />
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

        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.cardItem}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {events[card].name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      {getDate(events[card].dateTime)}
                    </Typography>
                    <Typography>{events[card].description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={'/event/' + events[card]._id}>
                      <Button variant="warning" size="lg">
                        View
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    );
  } else {
    return <h3> Loading...</h3>;
  }
}
export default Home;
