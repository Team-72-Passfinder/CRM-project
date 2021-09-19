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
  Grid,
  Paper,
} from '@material-ui/core';

import './frontpage.css';

const useStyles = makeStyles((theme) => ({
  root: {},
  heroContainer: {
    paddingTop: 10,
    paddingBottom: 50,
  },
  faqGrid: {
    padding: 10,
    margin: 20,
    background: 'pink',
  },
  button: {
    margin: 10,
  },
  footer: {
    color: 'white',
    background: 'navy',
  },
  testColor: {
    background: 'purple',
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
        <Container className={classes.heroContainer} maxWidth="md">
          <img className="Logo" src={logo} alt="Logo" />
          <Typography
            variant="h3"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Welcome to Citrus Contact!
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            vestibulum nibh quis sagittis placerat. Ut nisi quam, pharetra at
            risus a, scelerisque tristique magna. Pellentesque justo nulla,
            venenatis eget urna ac, luctus suscipit tortor. Pellentesque vitae
            sagittis risus. Duis non libero quis ipsum hendrerit commodo
          </Typography>
          <Container>
            <Button
              className={classes.button}
              color="primary"
              variant="outlined"
              onClick={goToLogin}
            >
              Login
            </Button>

            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              onClick={goToRegister}
            >
              Register
            </Button>
          </Container>
        </Container>
        {/* End Hero unit */}
        {/* FAQ Section */}
        <Box>
          <Grid container spacing={2}>
            <Grid item xs>
              <Paper elevation={3} className={classes.faqGrid}>
                Feature number one. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Praesent vestibulum nibh quis sagittis
                placerat. Ut nisi quam, pharetra at risus a, scelerisque
                tristique magna
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper elevation={3} className={classes.faqGrid}>
                Feature number two.
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper elevation={3} className={classes.faqGrid}>
                Feature number three.
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper elevation={3} className={classes.faqGrid}>
                Feature number four.
              </Paper>
            </Grid>
          </Grid>
        </Box>
        {/* End FAQ Section */}
      </main>
      {/* Footer */}
      <div>
        <p className="Footer">Made by Passfinders, 2021</p>
      </div>
      {/* End footer */}
    </div>
  );
}

export default Frontpage;
