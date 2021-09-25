import React, { useState, useEffect, Component } from 'react';
import { AppBar } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

import { getEvent } from '../../api';
import { editEvent } from '../../api';
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
                      {getDate(event.dateTime)}
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
