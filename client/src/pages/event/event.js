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
import { Link } from 'react-router-dom';

import { getEvent } from '../../api';
const useStyles = makeStyles((theme) => ({

  }));

function Event() {
    const classes = useStyles();
    const [event, setEvent] = useState();

    useEffect(() => {
        let id = window.location.pathname.split('/')[2]
        getEvent(id).then((res) => {
          setEvent(res);
        });
      }, []);

    if (event!=null){
        return (
            <div className={classes.root}>
                {
                    <React.Fragment>
                        <main>
                        <Typography variant='h6'>
                                {event.name}
                            </Typography>
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