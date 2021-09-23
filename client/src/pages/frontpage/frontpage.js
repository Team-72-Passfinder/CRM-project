import React from 'react';
import logo from '../frontpage/citrus-contact-logo.png';
import heroImage from '../frontpage/hero-image2.jpg';
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
  root: {
    background: ' #fff1e1',
  },
  hero: {
    marginBottom: 10,
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${heroImage})`,
    height: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  logoBox: {
    height: 180,
    paddingBottom: 30,
  },
  toolbar: {
    minHeight: 48,
    background: '#d2601a',
  },
  toolbarButton: {
    marginRight: 12,
  },
  button: {
    margin: 16,
  },
  featureBox: {
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  featurePaper: {
    padding: 10,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    background: `linear-gradient(rgba(210, 96, 26, 0.2), rgba(210, 96, 26, 0.2))`,
    maxWidth: '70vw',
  },
  featureImage: {
    marginRight: 40,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    height: '20%',
    width: '20%',
    maxWidth: 180,
    maxHeight: 180,
  },
  featureText: {
    margin: 20,
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
        <Toolbar className={classes.toolbar}>
          <Box display="flex" flexGrow={1}>
            <Typography variant="h6">Passfinders</Typography>
          </Box>
          <Button color="inherit" className={classes.toolbarButton}>
            About us
          </Button>
          <Button color="inherit" className={classes.toolbarButton}>
            Contact
          </Button>
          <Button
            color="inherit"
            className={classes.toolbarButton}
            variant="outlined"
            onClick={goToLogin}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero unit */}
      <Box className={classes.hero}>
        <Container>
          <Box
            display="flex"
            justifyContent="center"
            className={classes.logoBox}
          >
            <img src={logo} alt="Logo" />
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
      <Box className={classes.featureBox}>
        <Typography
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Feature
        </Typography>
        <Paper elevation={3} className={classes.featurePaper}>
          <Box display="flex" alignItems="center">
            <img className={classes.featureImage} src={logo} alt="Logo" />
            <Typography align="center" className={classes.featureText}>
              Feature number one. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Praesent vestibulum nibh quis sagittis placerat.
              Ut nisi quam, pharetra at risus a, scelerisque tristique magna
            </Typography>
          </Box>
        </Paper>
        <Paper
          elevation={3}
          className={classes.featurePaper}
          display="flex"
          alignItems="center"
        >
          <Box display="flex" alignItems="center">
            <Typography align="center" className={classes.featureText}>
              Feature number two. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Praesent vestibulum nibh quis sagittis placerat.
              Ut nisi quam, pharetra at risus a, scelerisque tristique magna
            </Typography>
            <img className={classes.featureImage} src={logo} alt="Logo" />
          </Box>
        </Paper>
      </Box>
      {/* End FAQ Section */}
    </div>
  );
}

export default Frontpage;
