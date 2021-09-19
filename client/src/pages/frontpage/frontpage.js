import React from 'react';
import logo from '../frontpage/citrus-contact-logo.png';
import {
  Button,
  makeStyles,
  Typography,
  Box,
  Container,
  AppBar,
  Toolbar,
} from '@material-ui/core';

import './frontpage.css';

const useStyles = makeStyles((theme) => ({
  root: {},
  logo: {
    alignSelf: 'center',
    margin: 10,
    width: 180,
    height: 180,
  },
  button: {
    margin: 10,
  },
}));

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
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Front page
          </Typography>
        </Toolbar>
      </AppBar>

      <main>
        {/* Hero unit */}
        <Box>
          <Container maxWidth="md">
            <img className="Logo" src={logo} alt="Logo" />
            <Typography
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Welcome to Citrus Contact!
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              paragraph
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              vestibulum nibh quis sagittis placerat. Ut nisi quam, pharetra at
              risus a, scelerisque tristique magna. Pellentesque justo nulla,
              venenatis eget urna ac, luctus suscipit tortor. Pellentesque vitae
              sagittis risus. Duis non libero quis ipsum hendrerit commodo
            </Typography>
            <Container
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
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
            </Container>
          </Container>
        </Box>
      </main>
    </div>
  );
}

export default Frontpage;
