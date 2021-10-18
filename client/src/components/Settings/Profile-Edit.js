import React from 'react';
import { Box, Avatar, Button } from '@mui/material';

import StandardInput from '../StandardInput';

const input = {
  width: '300px',
  maxWidth: '300px',
  height: '40px',
  borderRadius: '5px',
  '&.Mui-error': {
    background: '#FBB5B1',
    border: '1px solid #F9202B',
  },
  '& input:not(:placeholder-shown)': {
    height: '0px',
  },
};

function ProfileEdit({ user }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Avatar
          sx={{
            width: '80px',
            height: '80px',
            fontSize: '28px',
            mx: '20px',
            my: '20px',
          }}
          alt={user.firstName}
          src="/broken-image.jpg"
        />
        <Button sx={{ height: '40px' }}>Update</Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ mx: '20px' }}>
          <StandardInput sx={input} label="First name" value={user.firstName} />
        </Box>
        <StandardInput label="Last name" value={user.lastName} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Box sx={{ mx: '20px' }}>
          <StandardInput sx={input} label="Email" value={user.email} />
        </Box>
        <StandardInput label="Phone number" value={user.phoneNumber} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'end',
          alignItems: 'end',
        }}
      >
        <Button
          sx={{ width: '150px', height: '40px', mt: '40px' }}
          variant="contained"
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default ProfileEdit;
