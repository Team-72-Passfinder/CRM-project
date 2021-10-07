import { Button } from '@mui/material';
import React, { useState } from 'react';
import { sendEmailInvite } from '../api';


function EventInvite() {
    return (
      <div>
          <Button onClick={sendEmailInvite}>
              Send invite!
          </Button>
      </div>
    );
}

export default EventInvite;