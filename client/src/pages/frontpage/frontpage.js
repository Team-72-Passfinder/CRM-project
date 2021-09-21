import React from 'react';
import logo from '../frontpage/citrus-contact-logo.png';
import heroImage from '../frontpage/hero-image.jpg';
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
  hero: {
    paddingTop: 10,
    paddingBottom: 50,
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroImage})`,
    height: '500px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
  },
  logo: {
    width: 180,
    height: 180,
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Passfinders</Typography>
          <Typography variant="h6">About us</Typography>
          <Typography variant="h6">Login</Typography>
        </Toolbar>
      </AppBar>

      {/* Hero unit */}
      <Box className={classes.hero}>
        <Container>
          <Box display="flex" justifyContent="center">
            <img className={classes.logo} src={logo} alt="Logo" />
          </Box>
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
          <Box display="flex" justifyContent="center">
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              onClick={goToRegister}
            >
              Get started
            </Button>
          </Box>
        </Container>
      </Box>
      {/* End Hero unit */}
      {/* FAQ Section */}
      <Box>
        <Grid container spacing={2}>
          <Grid item xs>
            <Paper elevation={3} className={classes.faqGrid}>
              Feature number one. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Praesent vestibulum nibh quis sagittis placerat.
              Ut nisi quam, pharetra at risus a, scelerisque tristique magna
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
    </div>
  );
}

export default Frontpage;
