import React, { useState } from 'react';

import {
  Box,
  Container,
  TextField,
  Button,
  Link,
  Alert,
  Typography,
} from '@mui/material';

import { login } from '../../api';

function Register(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState();

  const submitHandler = (e) => {};

  return (
    <Container
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      maxWidth="xs"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '300px',
          maxWidth: '80vw',
        }}
      >
        <Typography
          sx={{
            mb: 2,
          }}
          variant="h5"
        >
          Register
        </Typography>
        <Box sx={{ width: '300px' }}>{alert}</Box>
        <TextField
          id="input_username"
          margin="normal"
          variant="outlined"
          size="small"
          fullWidth
          label="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          id="input_password"
          margin="normal"
          variant="outlined"
          type="password"
          size="small"
          fullWidth
          label="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'right',
            mb: 2,
          }}
        ></Box>
        <Button
          id="submit_button"
          margin="normal"
          variant="contained"
          color="primary"
          fullWidth
          onClick={submitHandler}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
}

export default Register;