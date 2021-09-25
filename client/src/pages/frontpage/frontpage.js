import React, { useRef } from 'react';
import logo from './citrus-contact-logo.png';
import {
  Button,
  Typography,
  Box,
  Container,
  AppBar,
  Toolbar,
  Paper,
  Grid,
  Link,
  createTheme,
  ThemeProvider,
} from '@mui/material';

import useStyles from './styles';

function Frontpage() {
  const goToLogin = () => (window.location.href = '/login');
  const goToRegister = () => (window.location.href = '/register');

  const aboutUsRef = useRef(null);
  const contactRef = useRef(null);
  const scrollToAboutUs = () =>
    aboutUsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const scrollToContact = () =>
    contactRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const orangeTheme = createTheme({
    palette: {
      primary: {
        main: '#d2601a',
      },
    },
  });
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Box display="flex" flexGrow={1}>
            <Link href="/" color="inherit">
              <Typography variant="h6">Passfinders</Typography>
            </Link>
          </Box>
          <Button
            color="inherit"
            className={classes.toolbarButton}
            onClick={scrollToAboutUs}
          >
            About us
          </Button>
          <Button
            color="inherit"
            className={classes.toolbarButton}
            onClick={scrollToContact}
          >
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
          <Box display="flex" justifyContent="center" alignItems="center">
            <img className={classes.logoHero} src={logo} alt="Logo" />
          </Box>
          <Typography variant="h3" color="white" align="center" gutterBottom>
            Welcome to Citrus Contact!
          </Typography>
          <Typography variant="body1" color="white" align="center">
            Have you ever troubled yourself trying to keep in check with all the
            connections you have? Feared you may missed an important meeting
            event? Want to know if there is a potential customer in your
            acquaitances pool? Our software Citrus Contact, a citrus-flavoured,
            unique and easy-to-use solution for all of your problems.
          </Typography>
          <Box display="flex" justifyContent="center">
            <ThemeProvider theme={orangeTheme}>
              <Button
                color="primary"
                variant="contained"
                onClick={goToRegister}
                sx={{ margin: 4 }}
              >
                Get started
              </Button>
            </ThemeProvider>
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
            <Typography align="center" p={5}>
              Feature number one. You can have relationship between your
              contacts, allow you to find potential customers from your known
              customers.
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
            <Typography align="center" p={5}>
              Feature number two. A system that keep track of which contact you
              frequently participate in events with, thus help you estimate the
              closeness of your relationships.
            </Typography>
            <img className={classes.featureImage} src={logo} alt="Logo" />
          </Box>
        </Paper>
      </Box>
      {/* End Feature section */}

      {/* About us section */}
      <Box className={classes.aboutUsSectionBox} ref={aboutUsRef}>
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
            We are a team of 5 passionate and inspired CS students, enrolled in
            University of Melbourne. This webapp is our capstone project.
          </Typography>
        </Box>
      </Box>
      {/* End About us section */}

      <footer ref={contactRef}>
        <Box className={classes.footerSectionBox}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs align="left">
              <Typography variant="h7" color="inherit">
                Made by Team Passfinders, 2021
              </Typography>
            </Grid>
            <Grid item xs align="center">
              <img className={classes.footerImage} src={logo} alt="Logo" />
            </Grid>
            <Grid item xs align="right">
              <Typography variant="h6" color="inherit">
                Contact
              </Typography>
              <Typography variant="h7" color="inherit">
                Email: lamkhoan@student.unimelb.edu.au
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </footer>
    </div>
  );
}

export default Frontpage;
