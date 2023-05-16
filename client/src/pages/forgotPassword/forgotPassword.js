import React, { useState } from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { forgotPassword } from '../../api';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    forgotPassword(email).then((res) => {
      setAlert("Please check your email for resetting password");
    });
  }

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
          // alignItems: 'center',
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
          Forgot Password
        </Typography>
        {
          alert.length !== 0 &&
          <Alert>
            {alert}
          </Alert>
        }
        <TextField
          id="input_email"
          margin="normal"
          variant="outlined"
          type="text"
          size="small"
          fullWidth
          label="email"
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            mb: 2,
          }}
        />
        <Button
          id="submit_button"
          margin="normal"
          variant="contained"
          color="primary"
          fullWidth
          onClick={submitHandler}
        >
          Submit
        </Button>
      </Box>
    </Container>
  )
}

export default ForgotPassword;
