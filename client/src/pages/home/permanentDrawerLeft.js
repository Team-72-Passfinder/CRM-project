import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import { Route, Switch } from "react-router";
import Home from './home'
import { Link } from 'react-router-dom';
const drawerWidth = 180;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  button: {
    
    width: drawerWidth,
    padding: theme.spacing(4),
  },
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
<Link to="/event">
  <Button variant="outline-light" size="lg">
    Event
  </Button>
</Link>
<Link to="/chat">
  <Button variant="outline-light" size="lg">
    Chat
  </Button>
</Link>
<Link to="/social">
  <Button variant="outline-light" size="lg">
    Socials
  </Button>
</Link>
<Link to="/profile">
  <Button variant="outline-light" size="lg">
    Profile
  </Button>
</Link>
<Link to="/login">
  <Button variant="warning" size="lg">
    Login
  </Button>
</Link>
     
      </Drawer>
    </div>
  );
}