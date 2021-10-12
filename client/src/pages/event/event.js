import React, { useState, useEffect, Component } from 'react';
import { AppBar } from '@mui/material';
import { Button } from '@mui/material';
import { Card } from '@mui/material';
import { CardActions } from '@mui/material';
import { CardContent } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { makeStyles, createTheme,ThemeProvider } from '@mui/styles';
import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

import { getEvent } from '../../api';
import { editEvent } from '../../api';
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
  if (event != null) {
    return (
      <div className={classes.root}>
        {
          <React.Fragment>
            <main>
              <Box className={classes.formContainer}>
                <Typography className={classes.title}>Event</Typography>
                <form className={classes.form}>
                  <Box mt={5}>
                    <Typography variant="h6">{event.name}</Typography>
                    <Typography variant="h6">
                      {getDate(event.startDateTime)}
                    </Typography>
                    <Typography variant="h6">{event.description}</Typography>
                  </Box>
                </form>
              </Box>
              <div>
                <Button
                  className={classes.button}
                  color="primary"
                  variant="outlined"
                  onClick={goToEdit}
                >
                  Edit
                </Button>
              </div>
              {/*Dummy send invite button*/}
              <div>
                <EventInvite />
              </div>
            </main>
          </React.Fragment>
        }
      </div>
    );
  } else {
    return <h3> Loading...</h3>;
  }
}
export default Event;
