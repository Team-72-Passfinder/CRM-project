import React, { useState, useEffect } from 'react';
import { AppBar } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import PermanentDrawerLeft from './permanentDrawerLeft';
import { Link } from 'react-router-dom';

import { getEvents } from '../../api';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  cardContent: {
    flexGrow: 1,
  },
}));

const maxCards = 6;
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
    return jsDate.toLocaleString('en-US');
  };

  if (events.length > 0) {
    return (
      <React.Fragment>
        <PermanentDrawerLeft />
        <AppBar position="relative"></AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
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
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card>
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
                      <Link to={'/event:' + events[card]._id}>
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
        </main>
      </React.Fragment>
    );
  } else {
    return <h3> Loading...</h3>;
  }
}
export default Home;
