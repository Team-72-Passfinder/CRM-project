import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Event from './event';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Event/>
          </Paper>
        </Grid>        
      </Grid>
    </div>
  );
}
