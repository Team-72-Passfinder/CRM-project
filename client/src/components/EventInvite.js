import { Button } from '@mui/material';
import React, { useState, useEffect, Component } from 'react';
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