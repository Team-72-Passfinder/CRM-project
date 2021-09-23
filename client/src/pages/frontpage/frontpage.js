import React from 'react';
import logo from '../frontpage/citrus-contact-logo.png';
import {
  Button,
  Typography,
  Box,
  Container,
  AppBar,
  Toolbar,
  Paper,
} from '@material-ui/core';

import useStyles from './styles';

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

      {/* Feature section */}
      <Box className={classes.featureSectionBox}>
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
      {/* End Feature section */}

      {/* About us section */}
      <Box className={classes.aboutUsSectionBox}>
        <Typography
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          About us
        </Typography>
        <Box className={classes.aboutUsTextBox}>
          <Typography variant="body1" align="center" color="text.secondary">
            Feature number two. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Praesent vestibulum nibh quis sagittis placerat. Ut
            nisi quam, pharetra at risus a, scelerisque tristique magna
          </Typography>
        </Box>
      </Box>
      {/* End About us section */}
    </div>
  );
}

export default Frontpage;
