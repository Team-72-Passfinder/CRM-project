import { Button } from '@mui/material';
import React from 'react';

function UnauthorizedAccessPage() {
  const goToLogin = () => (window.location.href = '/login');

  return (
    <div>
      <p>Unauthorized Acess! Please Login first!</p>
      <Button onClick={goToLogin}>Login</Button>
    </div>
  );
}

export default UnauthorizedAccessPage;
