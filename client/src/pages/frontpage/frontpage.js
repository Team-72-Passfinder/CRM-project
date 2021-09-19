import React from 'react';
import logo from '../frontpage/citrus-contact-logo.png';
import {
  Button,
  makeStyles,
  Typography,
  Box,
  Container,
} from '@material-ui/core';

import './frontpage.css';

const useStyles = makeStyles({
  root: {
    alignContent: 'center',
    background: '#fff1e1',
  },
  topbar: {
    alignSelf: 'stretch',
    alignItems: 'left',
    height: 52,
    flexDirection: 'row',
    background: '#d2601a',
  },
  logo: {
    margin: 10,
    width: 180,
    height: 180,
  },
  button: {
    margin: 10,
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
  },
});

function Frontpage() {
  const goToLogin = () => {
    window.location.href = '/login';
  };

  const goToRegister = () => {
    window.location.href = '/register';
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box className={classes.topbar}>
        <Typography>About us</Typography>
      </Box>

      <Container>
        <h1>Welcome to Citrus Contact!</h1>
        <img className={classes.logo} src={logo} alt="Logo" />
      </Container>
      <Box>
        <Button
          className={classes.button}
          color="primary"
          variant="outlined"
          onClick={goToLogin}
        >
          Go to Login page
        </Button>

        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          onClick={goToRegister}
        >
          Register (not implemented)
        </Button>
      </Box>
    </div>
  );
}

export default Frontpage;
