import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { sendEmailInvite, getEvent } from '../api';

function handleClick(id) {
  sendEmailInvite(id);
}

function EventInvite() {
  const [event, setEvent] = useState();

  // ? error here; is this actually likely to capture ID as expected in a format that the API can interact with?
  useEffect(() => {
    let id = window.location.pathname.split('/')[2];
    getEvent(id).then((res) => {
      setEvent(res);
    });
  }, []);

  if (event != null) {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => handleClick(event._id)}
        >
          Send invite!
        </Button>
      </div>
    );
  } else {
    return <h3> Loading...</h3>;
  }
}

export default EventInvite;
