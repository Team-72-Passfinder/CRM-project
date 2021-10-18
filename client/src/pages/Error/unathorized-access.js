import {
  AppBar,
  Button,
  Container,
  Link,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    background: ' #fff1e1',
  },
  toolbar: {
    minHeight: 48,
    background: '#d2601a',
  },
}));

function UnauthorizedAccessPage() {
  const classes = useStyles();
  const goToLogin = () => (window.location.href = '/login');

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Box display="flex" flexGrow={1}>
            <Link href="/" color="inherit">
              <Typography variant="h6">Passfinders</Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100vw',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 20,
        }}
        maxWidth="xs"
      >
        <Typography gutterBottom>
          Unauthorized Acess! Please login first!
        </Typography>
        <Button variant="contained" color="primary" onClick={goToLogin}>
          Login
        </Button>
      </Container>
    </div>
  );
}

export default UnauthorizedAccessPage;
