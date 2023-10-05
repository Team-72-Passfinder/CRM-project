import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function ResetPassword() {
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    console.log(id, 'we')
    if (id === undefined ) {
      history.push("/");
    }
  }, [])

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
        {/* <TextField
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
        /> */}
      </Box>
    </Container>
  )
}

export default ResetPassword;
