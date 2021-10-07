import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { sendEmailInvite, getEvent } from '../api';

function EventInvite() {
    const [eventId, setEventId] = useState();

    // ? error here; is this actually likely to capture ID as expected in a format that the API can interact with?
    function updateEventId() {
        let id = window.location.pathname.split('/')[2];
        setEventId(id);
    };

    return (
      <div>
          <Button onClick={sendEmailInvite(eventId)}>
              Send invite!
          </Button>
      </div>
    );
}

export default EventInvite;